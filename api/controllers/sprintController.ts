import { Request, Response } from "express";
import * as sprintService from "../services/sprintService";

export const createSprint = async (req: Request, res: Response) => {
  try {
    const sprint = await sprintService.createSprint(req.body);
    res.status(201).json(sprint);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating sprint", error: error.message });
  }
};

export const getSprintsByProjectId = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const sprints = await sprintService.getSprintsByProjectId(
      parseInt(projectId)
    );
    res.json(sprints);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching sprints", error: error.message });
  }
};

export const updateSprint = async (req: Request, res: Response) => {
  try {
    const { sprintId } = req.params;
    const sprint = await sprintService.updateSprint(
      parseInt(sprintId),
      req.body
    );
    res.json(sprint);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating sprint", error: error.message });
  }
};

export const deleteSprint = async (req: Request, res: Response) => {
  try {
    const { sprintId } = req.params;
    await sprintService.deleteSprint(parseInt(sprintId));
    res.json({ message: "Sprint deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting sprint", error: error.message });
  }
};

export const addTaskToSprint = async (req: Request, res: Response) => {
  try {
    const { sprintId, taskId } = req.params;
    await sprintService.addTaskToSprint(parseInt(sprintId), parseInt(taskId));
    res.json({ message: "Task added to sprint successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding task to sprint", error: error.message });
  }
};

export const removeTaskFromSprint = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    await sprintService.removeTaskFromSprint(parseInt(taskId));
    res.json({ message: "Task removed from sprint successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error removing task from sprint",
      error: error.message,
    });
  }
};

export const updateSprintProgress = async (req: Request, res: Response) => {
  try {
    const { sprintId } = req.params;
    const sprint = await sprintService.updateSprintProgress(parseInt(sprintId));
    res.json(sprint);
  } catch (error) {
    res.status(400).json({
      message: "Error updating sprint progress",
      error: error.message,
    });
  }
};

export const generateSprintReport = async (req: Request, res: Response) => {
  try {
    const { sprintId } = req.params;
    const report = await sprintService.generateSprintReport(parseInt(sprintId));
    res.json(report);
  } catch (error) {
    res.status(400).json({
      message: "Error generating sprint report",
      error: error.message,
    });
  }
};

export const getActiveSprintsForProject = async (
  req: Request,
  res: Response
) => {
  try {
    const { projectId } = req.params;
    const sprints = await sprintService.getActiveSprintsForProject(
      parseInt(projectId)
    );
    res.json(sprints);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching active sprints", error: error.message });
  }
};
