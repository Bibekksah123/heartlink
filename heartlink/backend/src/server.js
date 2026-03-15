import mongoose from "mongoose";
import app from "./app.js";
import connectDatabase from "./config/database.js";
import { env } from "./config/env.js";
import logger from "./config/logger.js";
import http from "http";
import initializeSokect from "./modules/socket/socket.js";


const server = http.createServer( app );

initializeSokect(server)

const startServer = async () => {
  await connectDatabase();

  const servers = server.listen(env.PORT, () => {
    logger.info(
      `🚀  Server running on port ${env.PORT} in ${env.NODE_ENV} mode`,
    );
  });

  // ── Graceful Shutdown ──────────────────────────────────
  const shutdown = async (signal) => {
    logger.info(`${signal} received. Shutting down gracefully...`);

    servers.close(async () => {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed");
      process.exit(0);
    });

    // Force shutdown if graceful close stalls
    setTimeout(() => {
      logger.error("Could not close connections in time. Forcing shutdown.");
      process.exit(1);
    }, 10_000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  // ── Unhandled Errors ────────────────────────────────────
  process.on("unhandledRejection", (err) => {
    logger.error("UNHANDLED REJECTION:", err);
    servers.close(() => process.exit(1));
  });

  process.on("uncaughtException", (err) => {
    logger.error("UNCAUGHT EXCEPTION:", err);
    process.exit(1);
  });
};

startServer();
