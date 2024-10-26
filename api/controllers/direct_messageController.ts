import * as directMessageService from "../services/directMessageService";
import { Request, Response } from "express";

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}
//utilisation de procedure stockeee

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
    res.json({ messages });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching messages",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const setLuAllMessageByUserId = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await directMessageService.markMessagesAsRead(req.user.id, id);
    res.json({ success: true });
    return { senderId: req.user.id, receiverId: id };
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while marking messages as read",
      details: error instanceof Error ? error.message : "Unknown error",
    });
    return null;
  }
};

export const recupListContacts = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const contacts = await directMessageService.getContactList(req.user.id);
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Controller error:", error);
    return res.status(500).json({
      error: "An error occurred while fetching contacts",
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
      req.user.id,
      receiverId,
      content
    );
    res.json(message);
    return message;
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while sending the message" });
    return null;
  }
};

export const recupAllDiscussionList = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const discussions = await directMessageService.getConversations(
      req.user.id
    );
    res.json(discussions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching discussions" });
  }
};

export const recupUserContactById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await directMessageService.getUserContactById(id);
    res.json(contact);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the contact" });
  }
};

export const countUnreadMessage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const count = await directMessageService.countUnreadMessages(req.user.id);
    res.json(count);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while counting unread messages" });
  }
};

export const deleteMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { message_id } = req.params;
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await directMessageService.deleteMessage(message_id, req.user.id);
    res.json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the message" });
  }
};
