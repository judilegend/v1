import express from "express";
import * as salleController from "../controllers/salleController";
import { authenticate } from "../middleware/authMiddleware";
// import { requireAuthNormal } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticate, salleController.getAllSalleStockage);
router.post("/", authenticate, salleController.createSalle);

export default router;
