import express from "express";
import * as workpackageController from "../controllers/workpackageController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticate, workpackageController.createWorkPackage);
router.get(
  "/project/:projectId",
  authenticate,
  workpackageController.getWorkPackagesByProjectId
);
router.put("/:id", authenticate, workpackageController.updateWorkPackage);
router.delete("/:id", authenticate, workpackageController.deleteWorkPackage);

export default router;
