import User from "../modules/user/user.model.js";
import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";

const authenticate = async (req, _res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.refreshToken) {
      token = req.cookies.refreshToken;
    } else {
      throw ApiError.unauthorized("Authentication token required");
    }

    if (!token) {
      throw ApiError.unauthorized("Token is missing");
    }


    let payload;
    try {
      payload = verifyToken(token);
    } catch {
      throw ApiError.unauthorized(
        "Invalid or expired token. Please login again.",
      );
    }


    const user = await User.findById(payload.userId).select(
      "_id role isActive",
    );

    if (!user) {
      throw ApiError.unauthorized("Account no longer exists");
    }

    if (!user.isActive) {
      throw ApiError.forbidden(
        "Your account has been deactivated. Contact support.",
      );
    }

    req.user = {
      userId: payload.userId,
      role: payload.role,
      _id: user._id,
    };

    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
