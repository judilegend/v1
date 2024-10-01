import { Request, Response } from "express";
import * as tacheService from "../services/tacheService";

export const createTache = async (req: Request, res: Response) => {
  try {
    const tache = await tacheService.createTache(req.body);
    res.status(201).json(tache);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating tache", error: error.message });
  }
};

export const getTachesByActiviteId = async (req: Request, res: Response) => {
  try {
    const taches = await tacheService.getTachesByActiviteId(
      parseInt(req.params.activiteId)
    );
    res.json(taches);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching taches", error: error.message });
  }
};

export const updateTache = async (req: Request, res: Response) => {
  try {
    const tache = await tacheService.updateTache(
      parseInt(req.params.id),
      req.body
    );
    res.json(tache);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating tache", error: error.message });
  }
};

export const deleteTache = async (req: Request, res: Response) => {
  try {
    await tacheService.deleteTache(parseInt(req.params.id));
    res.json({ message: "Tache deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting tache", error: error.message });
  }
};
