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
    is_online: user.is_online || false,
  }));
};

export const updateUserOnlineStatus = async (
  userId: number,
  is_online: boolean
): Promise<User> => {
  const response = await axios.put<User>(
    `${API_URL}/${userId}/status`,
    { is_online },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
