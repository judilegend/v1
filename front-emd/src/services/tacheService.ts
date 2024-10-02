import axios from "axios";
import { Tache } from "../types/type";

const API_URL = "http://localhost:5000/api/tache";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  //   console.log(token);
  return { Authorization: `Bearer ${token}` };
};
export const fetchTaches = async (activiteId: number): Promise<Tache[]> => {
  const response = await axios.get(`${API_URL}/${activiteId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createTache = async (tache: Omit<Tache, "id">): Promise<Tache> => {
  const response = await axios.post(API_URL, tache, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateTache = async (
  id: number,
  tache: Partial<Tache>
): Promise<Tache> => {
  const response = await axios.put(`${API_URL}/${id}`, tache, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteTache = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeader(),
  });
};
