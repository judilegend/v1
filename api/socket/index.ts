import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { verifyToken } from "../middleware/authMiddleware";

export const setupSocketServer = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Match your frontend origin
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Authorization"],
    },
  });

  const userSockets = new Map();

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const user = await verifyToken(token);
      socket.data.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.user.id;
    userSockets.set(userId, socket.id);

    // Handle user online status
    socket.broadcast.emit("userStatus", { userId, is_online: true });

    // Join personal room
    socket.join(`user_${userId}`);

    // Handle private messages
    socket.on("privateMessage", async (data) => {
      const { receiverId, content } = data;
      const receiverSocketId = userSockets.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", {
          senderId: userId,
          content,
          timestamp: new Date(),
        });
      }
    });

    // Handle typing status
    socket.on("typing", (data) => {
      const { receiverId, isTyping } = data;
      const receiverSocketId = userSockets.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userTyping", {
          userId,
          isTyping,
        });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      userSockets.delete(userId);
      socket.broadcast.emit("userStatus", { userId, is_online: false });
    });
  });

  return io;
};
