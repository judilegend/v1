import * as directMessageService from "../services/directMessageService";
import { Request, Response } from "express";

export const recupListContacts = async (req: Request & { user?: { id: string } }, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const contacts = await directMessageService.getContactList(req.user.id);
    res.json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching contacts" });
  }
};

export const sendMessage = async (req: Request & { user?: { id: string } }, res: Response) => {
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
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while sending the message" });
  }
};

export const recupAllDiscussionList = async (req: Request & { user?: { id: string } }, res: Response) => {
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
export const recupAllMessagesFromUser = async (req: Request & { user?: { id: string } }, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const messages = await directMessageService.getMessagesBetweenUsers(
      req.user.id,
      id
    );
    res.json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching messages" });
  }
};
export const recupUserContactById = async (req: Request, res: Response) => {
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

export const setLuAllMessageByUserId = async (req: Request & { user?: { id: string } }, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await directMessageService.markMessagesAsRead(req.user.id, id);
    res.json({ message: "Messages marked as read successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while marking messages as read" });
  }
};
export const countUnreadMessage = async (req: Request & { user?: { id: string } }, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const count = await directMessageService.countUnreadMessages(req.user.id);
    res.json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while counting unread messages" });
  }
};

export const deleteMessage = async (req: Request & { user?: { id: string } }, res: Response) => {
  try {
    const { message_id } = req.params;
    if (req.user && req.user.id) {
      await directMessageService.deleteMessage(message_id, req.user.id);
      res.json({ message: "Message deleted successfully" });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the message" });
  }
};
