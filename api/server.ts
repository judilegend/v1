import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import sequelize from "./config/database";
import { setupSocketServer } from "./socket";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import directMessageRoutes from "./routes/directMessageRoute";
import salleRoutes from "./routes/salleRoute";
import activiteRoutes from "./routes/activiteRoutes";
import pomodoroRoutes from "./routes/pomodoroRoutes";
import workPackageRoutes from "./routes/workpackageRoutes";
import sprintRoutes from "./routes/sprintRoutes";
import tacheRoutes from "./routes/tacheRoutes";
import pieceJointeRoutes from "./routes/pieceJointeRoutes";
import path from "path";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true,
  })
);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend origin
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Authorization"],
  },
});
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../uploads/images")));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tache", tacheRoutes);
app.use("/api/workpackage", workPackageRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/sprints", sprintRoutes);
app.use("/api/activite", activiteRoutes);
app.use("/api/messages", directMessageRoutes);
app.use("/api/salle", salleRoutes);
app.use("/api/pomodoro", pomodoroRoutes);
// app.use("/api/piece-jointes", pieceJointeRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export { app, io };
