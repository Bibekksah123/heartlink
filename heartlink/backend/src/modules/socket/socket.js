import { Server } from "socket.io";
import chatModel from "../chat/chat.model.js";
import logger from "../../config/logger.js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    logger.info("A user connected:", socket.id);

    socket.on("joinChat", ({ userId, toUserId }) => {
      const room = [userId, toUserId].sort().join("_");
      socket.join(room);
      logger.info(`User ${userId} joined room: ${room}`);
    });

    // ✅ Issue 2 fix: handle leaveChat
    socket.on("leaveChat", ({ userId, toUserId }) => {
      const room = [userId, toUserId].sort().join("_");
      socket.leave(room);
      logger.info(`User ${userId} left room: ${room}`);
    });

    socket.on("sendChat", async ({ userId, toUserId, text }) => {
      const room = [userId, toUserId].sort().join("_");

      try {
        await chatModel.findOneAndUpdate(
          { participate: { $all: [userId, toUserId] } },
          {
            $setOnInsert: { participate: [userId, toUserId] },
            $push: {
              message: {
                senderId: userId,
                text,
                createdAt: new Date(), // ✅ Issue 3 fix
              },
            },
          },
          { upsert: true, new: true },
        );

        // ✅ Issue 1 fix: "receiveChat" not "recieveChat"
        io.to(room).emit("receiveChat", {
          text,
          from: userId,
          to: toUserId,
          timestamp: new Date(),
        });
      } catch (error) {
        logger.error("Chat save error:", error);
      }
    });

    socket.on("disconnect", () => {
      logger.info("User disconnected:", socket.id);
    });
  });
};

export default initializeSocket;
