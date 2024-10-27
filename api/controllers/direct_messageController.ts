import * as directMessageService from "../services/directMessageService";
import { Request, Response } from "express";
import { io } from "../server";

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Controller for handling direct messaging functionality
 */
export const recupAllMessagesFromUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const messages = await directMessageService.getMessagesBetweenUsers(
      req.user.id,
      id
    );

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      error: "An error occurred while fetching messages",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { receiverId, content } = req.body;
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const message = await directMessageService.sendMessage(
      req.user.id.toString(),
      receiverId,
      content
    );

    // Emit socket event for real-time updates
    io.to(`user_${receiverId}`).emit("newMessage", {
      ...message.toJSON(),
      isSender: false,
    });

    return res.status(200).json({
      ...message.toJSON(),
      isSender: true,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      error: "Failed to send message",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
export const recupListContacts = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const contacts = await directMessageService.getContactList(req.user.id);
    return res.status(200).json({
      contacts,
      success: true,
    });
  } catch (error) {
    console.error("Controller error:", error);
    return res.status(500).json({
      error: "An error occurred while fetching contacts",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const users = await directMessageService.getAllUsers(req.user.id);
    return res.status(200).json({
      users,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while fetching users",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
