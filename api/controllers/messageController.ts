// const Message = require("../models/message");

// exports.getMessages = async (req, res) => {
//   try {
//     const messages = await Message.findAll({ order: [["timestamp", "ASC"]] });
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching messages" });
//   }
// };

// exports.createMessage = async (req, res) => {
//   try {
//     const message = await Message.create(req.body);
//     res.status(201).json(message);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating message" });
//   }
// };
import { Request, Response } from "express";
import Message from "../models/message";
import sequelize from "../config/database";
import { Op } from "sequelize";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const messages = await Message.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
      order: [["timestamp", "ASC"]],
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error creating message" });
  }
};
