import { Op } from "sequelize";
import DirectMessage from "../models/direct_message";
import User from "../models/user";

export const getContactList = async (userId: string) => {
  try {
    const users = await User.findAll({
      where: {
        id: { [Op.ne]: parseInt(userId) },
      },
      attributes: ["id", "email", "username", "is_online"], // Updated field list to match User model
    });

    return {
      contacts: users.map((user) => ({
        id: user.id,
        name: user.username, // Map username to name if needed
        email: user.email,
        is_online: user.is_online,
      })),
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

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

    // Fetch the created message with associated user data
    const createdMessage = await DirectMessage.findByPk(message.id, {
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "username", "last_activity"],
        },
        {
          model: User,
          as: "receiver",
          attributes: ["id", "username", "last_activity"],
        },
      ],
    });

    return createdMessage;
  } catch (error) {
    console.error("Error in sendMessage service:", error);
    throw new Error("Failed to create message");
  }
};

///utilisation procedure stockee fonction
export const getMessagesBetweenUsers = async (
  userId1: string,
  userId2: string
) => {
  const messages = await DirectMessage.getConversationUsingProc(
    userId1,
    userId2
  );

  // Return empty array if no messages found
  if (!messages || !Array.isArray(messages)) {
    return [];
  }

  // Return the messages array directly
  return messages;
};

export const markMessagesAsRead = async (
  userId: string,
  otherUserId: string
) => {
  await DirectMessage.markMessagesReadUsingProc(userId, otherUserId);
};
export const getConversations = async (userId: string) => {
  const latestMessages = await DirectMessage.getLatestMessages();
  const unreadCounts = await DirectMessage.getUnreadCount(userId);

  // Process and format the conversations
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

export const countUnreadMessages = async (userId: string) => {
  const count = await DirectMessage.count({
    where: {
      receiverId: userId,
      read: false,
    },
  });
  return { count };
};

export const deleteMessage = async (messageId: string, userId: string) => {
  const message = await DirectMessage.findOne({
    where: {
      id: messageId,
      senderId: userId,
    },
  });

  if (!message) {
    throw new Error("Message not found or unauthorized");
  }

  await message.destroy();
  return { success: true };
};

export const getUserContactById = async (userId: string) => {
  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "email", "is_online"],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return { contact: user };
};
