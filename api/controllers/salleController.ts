import { Request, Response } from "express";
import * as salleService from "../services/salleService";

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const createSalle = async (req: AuthRequest, res: Response) => {
  try {
    const { name, members } = req.body;
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const salle = await salleService.createSalle(name, req.user.id, members);
    res.status(201).json(salle);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the salle" });
  }
};

export const getAllSalleStockage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const salles = await salleService.getAllSalles(req.user.id);
    res.json(salles);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching salles" });
  }
};

export const addUserToSalle = async (req: AuthRequest, res: Response) => {
  try {
    const { salleId, userId } = req.body;
    const updatedSalle = await salleService.addUserToSalle(salleId, userId);
    res.json(updatedSalle);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding user to salle" });
  }
};

export const removeUserFromSalle = async (req: AuthRequest, res: Response) => {
  try {
    const { salleId, userId } = req.body;
    const updatedSalle = await salleService.removeUserFromSalle(
      salleId,
      userId
    );
    res.json(updatedSalle);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while removing user from salle" });
  }
};
