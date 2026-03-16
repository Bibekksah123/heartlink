import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8000"; // ← change to your backend URL

let socket = null; 

export const soketConnection = () => {
  if (socket && socket.connected) return socket; // reuse if already connected

  socket = io(SOCKET_URL, {
    withCredentials: true, // sends cookies (if you use cookie-based auth)
    transports: ["websocket"], // skip polling, go straight to WS
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.warn("⚠️ Socket disconnected:", reason);
  });

  return socket;
};
