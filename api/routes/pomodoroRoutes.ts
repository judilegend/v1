import express from "express";
import * as pomodoroController from "../controllers/pomodoroController";

const router = express.Router();

router.post("/tache/:tacheId/start", pomodoroController.startPomodoro);
router.put("/:pomodoroId/complete", pomodoroController.completePomodoro);
router.get("/tache/:tacheId", pomodoroController.getPomodorosForTache);
router.get("/tache/:tacheId/current", pomodoroController.getCurrentPomodoro);

export default router;
