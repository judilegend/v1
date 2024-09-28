import axios from "axios";
import { Project } from "../types/type";

const API_URL = "http://localhost:5000/api/project";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getAllProjects = async (): Promise<Project[]> => {
  const response = await axios.get<Project[]>(API_URL, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createProject = async (
  project: Omit<Project, "id">
): Promise<Project> => {
  const response = await axios.post<Project>(API_URL, project, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateProject = async (
  id: number,
  project: Partial<Project>
): Promise<Project> => {
  const response = await axios.put<Project>(`${API_URL}/${id}`, project, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
};
