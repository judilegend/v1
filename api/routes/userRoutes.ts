import express from "express";
import * as userController from "../controllers/userController";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

// router.use(authenticate);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id",  userController.deleteUser);

export default router;
