import * as projectService from "../services/projectService";
import { Request, Response } from "express";
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, budget, deadline } = req.body;
    const project = await projectService.creerProject(
      title,
      description,
      budget,
      deadline
    );
    res.status(201).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
};
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
};
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, budget, deadline } = req.body;
    const updatedProject = await projectService.updateProject(parseInt(id), {
      title,
      description,
      budget,
      deadline,
    });
    res.json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating project", error: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await projectService.deleteProject(parseInt(id));
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: error.message });
  }
};
