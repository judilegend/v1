import express from "express";
import * as tacheController from "../controllers/tacheController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticate, tacheController.createTache);
router.get("/:activiteId", authenticate, tacheController.getTachesByActiviteId);
router.put("/:id", authenticate, tacheController.updateTache);
router.delete("/:id", authenticate, tacheController.deleteTache);

export default router;
