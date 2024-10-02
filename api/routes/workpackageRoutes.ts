import express from "express";
import * as workpackageController from "../controllers/workpackageController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", workpackageController.createWorkPackage);
router.get(
  "/project/:projectId",
  // authenticate,
  workpackageController.getWorkPackagesByProjectId
);
router.put("/:id",  workpackageController.updateWorkPackage);
router.delete("/:id", workpackageController.deleteWorkPackage);

export default router;
