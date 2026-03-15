import jwt from "jsonwebtoken";
import ApiError from "./ApiError.js";
import { env } from "../config/env.js";

/**
 * @param {{ userId: string, role: string }} payload
 * @returns {string}
 */
const signToken = (payload) =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

/**
 * @param {string} token
 * @returns {{ userId: string, role: string }}
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch {
    throw ApiError.unauthorized("Invalid or expired token");
  }
};

export { signToken, verifyToken };