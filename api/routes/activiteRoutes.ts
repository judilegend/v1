import express from "express";
import * as activiteController from "../controllers/activiteController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", activiteController.createActivite);
router.get(
  "/workpackage/:workPackageId",
  // authenticate,
  activiteController.getActivitesByWorkPackageId
);
router.put("/:id", activiteController.updateActivite);
router.delete("/:id", activiteController.deleteActivite);

export default router;
