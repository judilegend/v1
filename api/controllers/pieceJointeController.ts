import { Request, Response } from "express";
import { pieceJointeService } from "../services/pieceJointeService";
import fs from "fs";
import path from "path";

export const pieceJointeController = {
  async upload(req: Request, res: Response) {
    try {
      const file = req.file;
      const { activiteId } = req.body;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const pieceJointe = await pieceJointeService.create({
        activiteId: parseInt(activiteId),
        filename: file.filename,
        originalName: file.originalname,
        path: `/images/${file.filename}`,
        mimetype: file.mimetype,
        size: file.size,
      });

      res.status(201).json(pieceJointe);
    } catch (error) {
      res.status(500).json({ message: "Error uploading file", error });
    }
  },

  async getByActiviteId(req: Request, res: Response) {
    try {
      const { activiteId } = req.params;
      const pieceJointes = await pieceJointeService.findByActiviteId(
        parseInt(activiteId)
      );
      res.json(pieceJointes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching attachments", error });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pieceJointe = await pieceJointeService.findById(parseInt(id));

      if (!pieceJointe) {
        return res.status(404).json({ message: "Attachment not found" });
      }

      // Delete file from filesystem
      const filePath = path.join(
        __dirname,
        "../../uploads/images/",
        pieceJointe.filename
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await pieceJointeService.delete(parseInt(id));
      res.json({ message: "Attachment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting attachment", error });
    }
  },
};
