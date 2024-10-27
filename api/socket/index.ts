import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { verifyToken } from "../middleware/authMiddleware";
import * as directMessageService from "../services/directMessageService";

export const setupSocketServer = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
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
    socket.join(`user_${userId}`);

    socket.broadcast.emit("userStatus", { userId, isOnline: true });

    socket.on("privateMessage", async (data) => {
      const { receiverId, content } = data;
      try {
        const message = await directMessageService.sendMessage(
          userId.toString(),
          receiverId.toString(),
          content
        );

        const receiverSocketId = userSockets.get(parseInt(receiverId));
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", {
            ...message.toJSON(),
            isSender: false,
          });
        }

        socket.emit("newMessage", {
          ...message.toJSON(),
          isSender: true,
        });
      } catch (error) {
        socket.emit("messageError", { error: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {
      userSockets.delete(userId);
      socket.broadcast.emit("userStatus", { userId, isOnline: false });
    });
  });

  return io;
};
