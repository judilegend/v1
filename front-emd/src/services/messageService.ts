import axios from "axios";

const API_URL = "http://localhost:5000/api";

// export const getMessages = async () => {
//   const response = await axios.get(`${API_URL}/messages`);
//   return response.data;
// };

export const sendMessage = async (messageData: {
  sender: string;
  content: string;
}) => {
  const response = await axios.post(`${API_URL}/messages`, messageData);
  return response.data;
};
