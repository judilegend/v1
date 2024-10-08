import express from "express";
import * as sprintController from "../controllers/sprintController";

const router = express.Router();

router.post("/", sprintController.createSprint);
router.get("/project/:projectId", sprintController.getSprintsByProjectId);
router.put("/:sprintId", sprintController.updateSprint);
router.delete("/:sprintId", sprintController.deleteSprint);
router.post("/:sprintId/tasks/:taskId", sprintController.addTaskToSprint);
router.delete("/tasks/:taskId", sprintController.removeTaskFromSprint);
router.put("/:sprintId/progress", sprintController.updateSprintProgress);
router.get("/:sprintId/report", sprintController.generateSprintReport);
router.get(
  "/active/project/:projectId",
  sprintController.getActiveSprintsForProject
);

export default router;
