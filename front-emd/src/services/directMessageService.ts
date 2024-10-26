// import api from "./api";
// import { AxiosResponse } from "axios";

// const handleApiError = (error: any) => {
//   if (error.response?.status === 401) {
//     throw new Error("Authentication required");
//   }
//   throw error;
// };

// export const getContactList = async () => {
//   try {
//     const response: AxiosResponse = await api.get("/messages/contacts");
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// export const sendMessage = async (receiverId: string, content: string) => {
//   try {
//     const response = await api.post("/messages/send", { receiverId, content });
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// export const getConversations = async () => {
//   try {
//     const response = await api.get("/messages/conversations");
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// export const getMessagesFromUser = async (userId: string) => {
//   try {
//     const response = await api.get(`/messages/${userId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// export const getUserContactById = async (userId: string) => {
//   try {
//     const response = await api.get(`/messages/contact/${userId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// export const markMessagesAsRead = async (userId: string) => {
//   try {
//     const response = await api.put(`/messages/read/${userId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// export const getUnreadMessageCount = async () => {
//   try {
//     const response = await api.get("/messages/count/unread");
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// export const deleteMessage = async (messageId: string) => {
//   try {
//     const response = await api.delete(`/messages/${messageId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };
import api from "./api";

export const getContactList = async () => {
  const response = await api.get("/messages/contacts");
  return response.data;
};

export const sendMessage = async (receiverId: string, content: string) => {
  const response = await api.post("/messages/send", { receiverId, content });
  return response.data;
};

export const getConversations = async () => {
  const response = await api.get("/messages/conversations");
  return response.data;
};

export const getMessagesFromUser = async (userId: string) => {
  const response = await api.get(`/messages/${userId}`);
  return response.data;
};

export const markMessagesAsRead = async (userId: string) => {
  const response = await api.put(`/messages/read/${userId}`);
  return response.data;
};
