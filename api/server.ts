import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import messageRoutes from "./routes/messageRoutes";
import activiteRoutes from "./routes/activiteRoutes";
import pomodoroRoutes from "./routes/pomodoroRoutes";
import workPackageRoutes from "./routes/workpackageRoutes";
import sprintRoutes from "./routes/sprintRoutes";
import tacheRoutes from "./routes/tacheRoutes";
// import tempsRoutes from "./routes/pomodoroRoutes"
import sequelize from "./config/database";
import Message from "./models/message";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tache", tacheRoutes);
app.use("/api/workpackage", workPackageRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/sprints", sprintRoutes);
app.use("/api/activite", activiteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/pomodoro", pomodoroRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join", (userId: string) => {
    socket.join(userId);
    console.log(`User ${userId} joined`);
  });

  socket.on(
    "sendMessage",
    async (messageData: {
      senderId: string;
      receiverId: string;
      content: string;
    }) => {
      try {
        const message = await Message.create(messageData);
        io.to(messageData.receiverId).emit("newMessage", message);
        socket.emit("messageSent", message);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export { app, io };
