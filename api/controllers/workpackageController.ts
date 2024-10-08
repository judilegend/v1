import { Request, Response } from "express";
import * as workpackageService from "../services/workpackageService";
import Activity from "../models/activite";

export const createWorkPackage = async (req: Request, res: Response) => {
  try {
    const workPackage = await workpackageService.createWorkPackage(req.body);
    res.status(201).json(workPackage);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating work package", error: error.message });
  }
};

export const getWorkPackagesByProjectId = async (
  req: Request,
  res: Response
) => {
  try {
    const workPackages = await workpackageService.getWorkPackagesByProjectId(
      parseInt(req.params.projectId)
    );
    res.json(workPackages);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching work packages", error: error.message });
  }
};

export const getWorkPackageById = async (req: Request, res: Response) => {
  try {
    const workPackage = await workpackageService.getWorkPackageById(
      parseInt(req.params.id)
    );
    if (!workPackage) {
      return res.status(404).json({ message: "Work package not found" });
    }
    res.json(workPackage);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching work package", error: error.message });
  }
};

export const updateWorkPackage = async (req: Request, res: Response) => {
  try {
    const workPackage = await workpackageService.updateWorkPackage(
      parseInt(req.params.id),
      req.body
    );
    res.json(workPackage);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating work package", error: error.message });
  }
};

export const deleteWorkPackage = async (req: Request, res: Response) => {
  try {
    await workpackageService.deleteWorkPackage(parseInt(req.params.id));
    res.json({ message: "Work package deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting work package", error: error.message });
  }
};
