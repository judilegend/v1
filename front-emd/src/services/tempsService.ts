import axios from "axios";
import { Temps } from "../types/types";

const API_URL = "http://localhost:5000/api/temps";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  //   console.log(token);
  return { Authorization: `Bearer ${token}` };
};
export const fetchTemps = async (tacheId: number): Promise<Temps[]> => {
  const response = await axios.get(`${API_URL}/${tacheId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createTemps = async (temps: Omit<Temps, "id">): Promise<Temps> => {
  const response = await axios.post(API_URL, temps, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateTemps = async (
  id: number,
  temps: Partial<Temps>
): Promise<Temps> => {
  const response = await axios.put(`${API_URL}/${id}`, temps, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteTemps = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeader(),
  });
};
