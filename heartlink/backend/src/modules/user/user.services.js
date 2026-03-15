// src/modules/user/user.service.js

import logger from "../../config/logger.js";
import ApiError from "../../utils/ApiError.js";
import { signToken } from "../../utils/jwt.js";
import { userRepository } from "./user.repository.js";

class UserService {
  async register({ name, email, password, role = "user", dataOfBirth ,gender}) {
    const alreadyExists = await userRepository.findByEmail(email);
    if (alreadyExists) {
      throw ApiError.badRequest("An account with this email already exists");
    }

    const user = await userRepository.create({ name, email, password, role ,dataOfBirth,gender});
    const token = signToken({ userId: user._id.toString(), role: user.role });

    logger.info(`New user registered: ${user.email}`);

    const { password: _, ...safeUser } = user.toObject();
    return { user: safeUser, token };
  }

  async login(email, password) {
    const user = await userRepository.findByEmailWithPassword( email );
    

    if (!user || !(await user.comparePassword(password))) {
      throw ApiError.unauthorized("Invalid email or password");
    }


    const token = signToken( { userId: user._id, role: user.role } );
    logger.info(`User logged in: ${user.email}`);

    const { password: _, ...safeUser } = user.toObject();
    return { user: safeUser, token };
  }

  async changePassword(id, { currentPassword, newPassword }) {
    const user = await userRepository.findByEmailWithPassword(
      (await userRepository.findById(id)).email,
    );
    const isCorrect = await user.comparePassword(currentPassword);
    if (!isCorrect) {
      throw ApiError.unauthorized("Current password is incorrect");
    }
    const isSame = await user.comparePassword(newPassword);
    if (isSame) {
      throw ApiError.badRequest(
        "New password must be different from current password",
      );
    }

    user.password = newPassword;
    await user.save();

    logger.info(`Password changed for user: ${user.email}`);
  }
}

export const userService = new UserService();
