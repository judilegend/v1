import { Op } from "sequelize";
import DirectMessage from "../models/direct_message";
import User from "../models/user";

/**
 * Direct Message Service
 * Handles all business logic for direct messaging functionality
 */
// export const getContactList = async (userId: string) => {
//   try {
//     const users = await User.findAll({
//       where: {
//         id: { [Op.ne]: parseInt(userId) },
//       },
//       attributes: ["id", "email", "username", "is_online"],
//     });

//     return {
//       contacts: users.map((user) => ({
//         id: user.id,
//         name: user.username,
//         email: user.email,
//         is_online: user.is_online,
//       })),
//     };
//   } catch (error) {
//     console.error("Error fetching contacts:", error);
//     throw error;
//   }
// };

/**
 * Sends a new message using stored procedure
 */
export const sendMessage = async (
  senderId: string,
  receiverId: string,
  content: string
) => {
  try {
    const message = await DirectMessage.create({
      senderId: parseInt(senderId),
      receiverId: parseInt(receiverId),
      content,
      read: false,
    });

    return message;
  } catch (error) {
    console.error("Error in sendMessage service:", error);
    throw new Error("Failed to create message");
  }
};

/**
 * Gets messages between two users using stored procedure
 */
export const getMessagesBetweenUsers = async (
  userId1: string,
  userId2: string
) => {
  const messages = await DirectMessage.getConversationUsingProc(
    userId1,
    userId2
  );
  return { messages };
};

/**
 * Marks messages as read using stored procedure
 */
export const markMessagesAsRead = async (
  userId: string,
  otherUserId: string
) => {
  await DirectMessage.markMessagesReadUsingProc(userId, otherUserId);
};

/**
 * Gets all conversations for a user using view
 */
export const getConversations = async (userId: string) => {
  const latestMessages = await DirectMessage.getLatestMessages();
  const unreadCounts = await DirectMessage.getUnreadCount(userId);

  const conversations = latestMessages.reduce((acc: any, message: any) => {
    const otherUserId =
      message.sender_id === parseInt(userId)
        ? message.receiver_id
        : message.sender_id;

    if (!acc[otherUserId]) {
      acc[otherUserId] = {
        id: otherUserId,
        lastMessage: message,
        unreadCount:
          unreadCounts.find(
            (count: any) => count.receiver_id === parseInt(userId)
          )?.unread_count || 0,
      };
    }
    return acc;
  }, {});

  return { conversations: Object.values(conversations) };
};

export const getContactList = async (userId: string) => {
  try {
    const users = await User.findAll({
      where: {
        id: { [Op.ne]: parseInt(userId) },
      },
      attributes: ["id", "email", "username", "is_online"],
      order: [["username", "ASC"]],
    });

    return users.map((user) => ({
      id: user.id,
      name: user.username,
      email: user.email,
      is_online: user.is_online,
    }));
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const getAllUsers = async (currentUserId: string) => {
  try {
    const users = await User.findAll({
      where: {
        id: { [Op.ne]: parseInt(currentUserId) },
      },
      attributes: ["id", "username", "email", "is_online"],
      order: [["username", "ASC"]],
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
