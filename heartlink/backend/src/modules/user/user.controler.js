import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { userService } from "./user.services.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: "/",
};

class UserController {
  register = asyncHandler(async (req, res) => {
    const result = await userService.register(req.body);
    ApiResponse.created(res, result, "Registration successful");
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.cookie("refreshToken",result.token, COOKIE_OPTIONS);

    ApiResponse.success(res, result, "Login successful");
  } );
  
  logout = asyncHandler(async (req, res) => {
    res.clearCookie("refreshToken", COOKIE_OPTIONS);
    ApiResponse.success(res, null, "Logout successful");
  });

  changePassword = asyncHandler(async (req, res) => {
    await userService.changePassword(req.user._id, req.body);
    ApiResponse.success(res, null, "Password changed successfully");
  });
}

export const userController = new UserController();
