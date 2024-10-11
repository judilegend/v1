import axios from "axios";
import { User } from "../types/types";

const API_URL = "http://localhost:5000/api/user";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.map((user) => ({
    ...user,
    isOnline: user.isOnline || false,
  }));
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
