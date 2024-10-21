import api from "./api";
import { Message } from "../types/Messaging";

export const getMessages = (roomId: string) => {
  if (!roomId) {
    return Promise.reject(new Error("Room ID is undefined"));
  }
  return api.get<Message[]>(`/messages/${roomId}`);
};

export const sendMessage = (messageData: {
  roomId: string;
  content: string;
  sender: string;
}) => {
  return api.post<Message>("/messages", messageData);
};

export const getDirectMessages = (userId1: string, userId2: string) => {
  return api.get<Message[]>(`/messages/direct/${userId1}/${userId2}`);
};

export const getChannelMessages = (channelId: string) => {
  return api.get<Message[]>(`/messages/channel/${channelId}`);
};

export const updateMessage = (messageId: string, content: string) => {
  return api.put<Message>(`/messages/${messageId}`, { content });
};

export const deleteMessage = (messageId: string) => {
  return api.delete(`/messages/${messageId}`);
};

export default {
  getMessages,
  sendMessage,
  getDirectMessages,
  getChannelMessages,
  updateMessage,
  deleteMessage,
};
