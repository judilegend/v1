import axios from "axios";
import { WorkPackage } from "../types/type";

const API_URL = "http://localhost:5000/api/workpackage";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  //   console.log(token);
  return { Authorization: `Bearer ${token}` };
};
export const fetchWorkPackages = async (
  projectId: number
): Promise<WorkPackage[]> => {
  const response = await axios.get(`${API_URL}/project/${projectId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createWorkPackage = async (
  workPackage: Omit<WorkPackage, "id">
): Promise<WorkPackage> => {
  const response = await axios.post(API_URL, workPackage, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateWorkPackage = async (
  id: number,
  workPackage: Partial<WorkPackage>
): Promise<WorkPackage> => {
  const response = await axios.put(`${API_URL}/${id}`, workPackage, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteWorkPackage = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeader(),
  });
};
