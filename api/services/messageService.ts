import Message from "../models/message";
import User from "../models/user";
import { Op } from "sequelize";
import { io } from "../server";

export const createMessage = async (messageData: any) => {
  const message = await Message.create(messageData);
  io.to(messageData.roomId).emit("new_message", message);
  return message;
};
export const getMessagesForRoom = async (roomId: string) => {
  const messages = await Message.findAll({
    where: { roomId },
    include: [{ model: User, as: "sender", attributes: ["id", "username"] }],
    order: [["createdAt", "ASC"]],
  });
  return messages;
};

export const createDirectMessage = async (
  senderId: number,
  receiverId: number,
  content: string,
  fileUrl?: string,
  messageType: "text" | "file" | "image" = "text"
) => {
  const message = await Message.create({
    senderId,
    receiverId,
    content,
    fileUrl,
    messageType,
  });
  return message;
};

export const createChannelMessage = async (
  senderId: number,
  channelId: number,
  content: string,
  fileUrl?: string,
  messageType: "text" | "file" | "image" = "text"
) => {
  const message = await Message.create({
    senderId,
    channelId,
    content,
    fileUrl,
    messageType,
  });
  return message;
};

export const getDirectMessages = async (
  userId1: number,
  userId2: number,
  limit: number = 50,
  before?: Date
) => {
  const whereClause: any = {
    [Op.or]: [
      { senderId: userId1, receiverId: userId2 },
      { senderId: userId2, receiverId: userId1 },
    ],
  };
  if (before) {
    whereClause.timestamp = { [Op.lt]: before };
  }

  const messages = await Message.findAll({
    where: whereClause,
    order: [["timestamp", "DESC"]],
    limit,
    include: [
      { model: User, as: "sender", attributes: ["id", "username"] },
      { model: User, as: "receiver", attributes: ["id", "username"] },
    ],
  });

  return messages.reverse();
};

export const getChannelMessages = async (
  channelId: number,
  limit: number = 50,
  before?: Date
) => {
  const whereClause: any = { channelId };
  if (before) {
    whereClause.timestamp = { [Op.lt]: before };
  }

  const messages = await Message.findAll({
    where: whereClause,
    order: [["timestamp", "DESC"]],
    limit,
    include: [{ model: User, as: "sender", attributes: ["id", "username"] }],
  });

  return messages.reverse();
};
export const getMessagesForChannel = async (
  channelId: number,
  limit: number = 50,
  before?: Date
) => {
  const whereClause: any = { channelId };
  if (before) {
    whereClause.timestamp = { [Op.lt]: before };
  }

  const messages = await Message.findAll({
    where: whereClause,
    order: [["timestamp", "DESC"]],
    limit,
    include: [{ model: User, as: "sender", attributes: ["id", "username"] }],
  });

  return messages.reverse();
};

export const getMessageById = async (messageId: number) => {
  const message = await Message.findByPk(messageId, {
    include: [{ model: User, as: "sender", attributes: ["id", "username"] }],
  });
  return message;
};

export const updateMessage = async (messageId: number, content: string) => {
  const message = await Message.findByPk(messageId);
  if (!message) {
    throw new Error("Message not found");
  }
  await message.update({ content });
  return message;
};

export const deleteMessage = async (messageId: number) => {
  const message = await Message.findByPk(messageId);
  if (!message) {
    throw new Error("Message not found");
  }
  await message.destroy();
};

export const getMessagesForTask = async (taskId: number) => {
  const messages = await Message.findAll({
    where: { referencedTaskId: taskId },
    order: [["timestamp", "ASC"]],
    include: [{ model: User, as: "sender", attributes: ["id", "username"] }],
  });
  return messages;
};
