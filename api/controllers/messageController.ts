import { Request, Response } from "express";
import * as messageService from "../services/messageService";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const message = await messageService.createMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating message", error: error.message });
  }
};
export const createDirectMessage = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, content, fileUrl, messageType } = req.body;
    const message = await messageService.createDirectMessage(
      senderId,
      receiverId,
      content,
      fileUrl,
      messageType
    );
    res.status(201).json(message);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating direct message", error: error.message });
  }
};
export const getMessagesForRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return res.status(400).json({ message: "Room ID is required" });
    }
    const messages = await messageService.getMessagesForRoom(roomId);
    res.json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
};

export const createChannelMessage = async (req: Request, res: Response) => {
  try {
    const { senderId, channelId, content, fileUrl, messageType } = req.body;
    const message = await messageService.createChannelMessage(
      senderId,
      channelId,
      content,
      fileUrl,
      messageType
    );
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({
      message: "Error creating channel message",
      error: error.message,
    });
  }
};

export const getDirectMessages = async (req: Request, res: Response) => {
  try {
    const { userId1, userId2 } = req.params;
    const { limit, before } = req.query;
    const messages = await messageService.getDirectMessages(
      parseInt(userId1),
      parseInt(userId2),
      limit ? parseInt(limit as string) : undefined,
      before ? new Date(before as string) : undefined
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching direct messages",
      error: error.message,
    });
  }
};

export const getChannelMessages = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;
    const { limit, before } = req.query;
    const messages = await messageService.getChannelMessages(
      parseInt(channelId),
      limit ? parseInt(limit as string) : undefined,
      before ? new Date(before as string) : undefined
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching channel messages",
      error: error.message,
    });
  }
};
export const getMessagesForChannel = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;
    const { limit, before } = req.query;
    const messages = await messageService.getMessagesForChannel(
      parseInt(channelId),
      limit ? parseInt(limit as string) : undefined,
      before ? new Date(before as string) : undefined
    );
    res.json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
};

export const getMessageById = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const message = await messageService.getMessageById(parseInt(messageId));
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching message", error: error.message });
  }
};

export const updateMessage = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;
    const updatedMessage = await messageService.updateMessage(
      parseInt(messageId),
      content
    );
    res.json(updatedMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating message", error: error.message });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    await messageService.deleteMessage(parseInt(messageId));
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting message", error: error.message });
  }
};

export const getMessagesForTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const messages = await messageService.getMessagesForTask(parseInt(taskId));
    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching messages for task",
      error: error.message,
    });
  }
};
