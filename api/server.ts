import express from "express";
import dotenv from "dotenv";
const http = require("http");
const socketIo = require("socket.io");
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import sequelize from "./config/database";
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");
const Message = require("./models/message");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/project/", projectRoutes);
app.use("/api/messages", messageRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", async (messageData) => {
    try {
      const message = await Message.create(messageData);
      io.emit("newMessage", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = { app, io };
