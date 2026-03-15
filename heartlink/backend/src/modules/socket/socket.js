import { Server } from "socket.io"; // 1. Fix: Import Server, not socket
import chatModel from "../chat/chat.model.js";
import logger from "../../config/logger.js";

const initializeSocket = (server) => {
  // 2. Fix: Typo in function name
  const io = new Server(server, {
    // 3. Fix: Use 'new Server'
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

    socket.on("sendChat", async ({ userId, toUserId, text }) => {
      const room = [userId, toUserId].sort().join("_");

      try {
        // 4. Advanced: Use upsert to find/create and push in one go
        await chatModel.findOneAndUpdate(
          { participate: { $all: [userId, toUserId] } },
          {
            $setOnInsert: { participate: [userId, toUserId] },
            $push: { message: { senderId: userId, text: text } },
          },
          { upsert: true, new: true },
        );

        // Emit to the room
        io.to(room).emit("recieveChat", {
          text,
          from: userId,
          to: toUserId,
          timestamp: new Date(), // Good practice to include this
        });
      } catch (error) {
        logger.error("Chat save error:", error);
      }
    });

    socket.on("disconnect", () => {
      // 5. Fix: Event is 'disconnect', not 'disConnectCHat'
      logger.info("User disconnected");
    });
  });
};

export default initializeSocket;
