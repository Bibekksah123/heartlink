// src/middlewares/error.middleware.js

import ApiError from "../utils/ApiError.js";


export const globalErrorHandler = (err, req, res, next) => {
  // ↑ MUST have exactly 4 parameters — this is how Express knows
  //   it is an error handler, not a regular middleware

  // ── Known ApiError (operational) ──────────────────────────
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      // Only show stack trace in development — NEVER in production
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // ── Mongoose duplicate key ─────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      statusCode: 409,
      message: `${field} already exists`,
    });
  }

  // ── Unknown error — never expose details in production ────
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Route ${req.originalUrl} not found`,
  });
};
