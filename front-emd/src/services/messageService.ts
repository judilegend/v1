import api from "./api";

export const getContactList = () => api.get("/messages/contacts");
export const sendMessage = (receiverId: string, content: string) =>
  api.post("/messages/send", { receiverId, content });
export const getConversations = () => api.get("/messages/conversations");
export const getMessagesFromUser = (userId: string) =>
  api.get(`/messages/${userId}`);
export const getUserContactById = (userId: string) =>
  api.get(`/messages/contact/${userId}`);
export const markMessagesAsRead = (userId: string) =>
  api.put(`/messages/read/${userId}`);
export const getUnreadMessageCount = () => api.get("/messages/count/unread");
export const deleteMessage = (messageId: string) =>
  api.delete(`/messages/${messageId}`);
