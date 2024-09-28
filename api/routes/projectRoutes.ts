import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../controllers/projectController";
import {
  authorizeAdmin,
  authorizeClient,
  authenticate,
} from "../middleware/authMiddleware";
const router = express.Router();

// router.post("/", authenticate, authorizeClient, createProject);
// router.get("/", authenticate, authorizeAdmin, getAllProjects);
// router.put("/:id", authenticate, authorizeAdmin, updateProject);
// router.delete("/:id", authenticate, authorizeAdmin, deleteProject);

router.post("/", createProject);
router.get("/", getAllProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
export default router;
