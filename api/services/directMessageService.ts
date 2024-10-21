// import { DirectMessage, User } from "../models/";
import { Op } from "sequelize";
import DirectMessage from "../models/direct_message";
import User from "../models/user";

export const getContactList = async (userId: string) => {
  // Implementation to get contact list
};

export const sendMessage = async (
  senderId: string,
  receiverId: string,
  content: string
) => {
  return DirectMessage.create({ senderId, receiverId, content });
};
export const getConversations = async (userId: string) => {
  // Implementation to get all conversations for a user
};

export const getMessagesBetweenUsers = async (
  userId1: string,
  userId2: string
) => {
  return DirectMessage.findAll({
    where: {
      [Op.or]: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    },
    order: [["createdAt", "ASC"]],
  });
};

export const markMessagesAsRead = async (
  userId: string,
  otherUserId: string
) => {
  // Implementation to mark messages as read
};

export const countUnreadMessages = async (userId: string) => {
  // Implementation to count unread messages
};

export const deleteMessage = async (messageId: string, userId: string) => {
  // Implementation to delete a message
};
export function getUserContactById(id: string) {
  throw new Error("Function not implemented.");
}
