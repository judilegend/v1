import axios from "axios";
import { User } from "../types/type";

const API_URL = "http://localhost:5000/api/user";
// console.log(localStorage.getItem("token"));
export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(response.data);
  return response.data;
};

export const updateUserOnlineStatus = async (
  userId: number,
  isOnline: boolean
): Promise<User> => {
  const response = await axios.put<User>(
    `${API_URL}/${userId}/status`,
    { isOnline },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
