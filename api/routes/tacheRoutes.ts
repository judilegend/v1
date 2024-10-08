import express from "express";
import * as tacheController from "../controllers/tacheController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", tacheController.createTache);
router.get("/:activiteId", tacheController.getTachesByActiviteId);
router.put("/:id", tacheController.updateTache);
router.delete("/:id", tacheController.deleteTache);
router.put("/:taskId/categorize", tacheController.categorizeTask);
router.get("/quadrants", tacheController.getTasksByQuadrant);
router.get("/sprint/:sprintId", tacheController.getTachesBySprintId);

export default router;
