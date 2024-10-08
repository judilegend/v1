import axios from "axios";
import { Activite } from "../types/type";

const API_URL = "http://localhost:5000/api/activite";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  //   console.log(token);
  return { Authorization: `Bearer ${token}` };
};
export const fetchActivites = async (
  workPackageId: number
): Promise<Activite[]> => {
  const response = await axios.get(`${API_URL}/workpackage/${workPackageId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createActivite = async (
  activite: Omit<Activite, "id">
): Promise<Activite> => {
  try {
    const response = await axios.post(API_URL, activite, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error creating activite:",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).response?.data || error.message
      );
    } else {
      console.error("An unknown error occurred");
    }
    throw error;
  }
};
export const updateActivite = async (
  id: number,
  activite: Partial<Activite>
): Promise<Activite> => {
  const response = await axios.put(`${API_URL}/${id}`, activite, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteActivite = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeader(),
  });
};
