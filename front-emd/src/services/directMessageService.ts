import api from "./api";

export const getContactList = () => api.get("/api/messages/contacts");
export const sendMessage = (receiverId: string, content: string) =>
  api.post("/api/messages/send", { receiverId, content });
export const getConversations = () => api.get("/api/messages/conversations");
export const getMessagesFromUser = (userId: string) =>
  api.get(`/api/messages/${userId}`);
export const getUserContactById = (userId: string) =>
  api.get(`/api/messages/contact/${userId}`);
export const markMessagesAsRead = (userId: string) =>
  api.put(`/api/messages/read/${userId}`);
export const getUnreadMessageCount = () =>
  api.get("/api/messages/count/unread");
export const deleteMessage = (messageId: string) =>
  api.delete(`/api/messages/${messageId}`);
