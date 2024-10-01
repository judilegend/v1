import express from "express";
import * as activiteController from "../controllers/activiteController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticate, activiteController.createActivite);
router.get(
  "/workpackage/:workPackageId",
  authenticate,
  activiteController.getActivitesByWorkPackageId
);
router.put("/:id", authenticate, activiteController.updateActivite);
router.delete("/:id", authenticate, activiteController.deleteActivite);

export default router;
