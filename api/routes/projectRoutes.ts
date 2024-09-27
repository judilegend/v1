import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../controllers/projectController";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
