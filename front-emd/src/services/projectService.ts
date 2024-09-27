import axios from "axios";
import { Project } from "../types/type";

const API_URL = "http://localhost:5000/api/project";

export const getAllProjects = async (): Promise<Project[]> => {
  const response = await axios.get<Project[]>(API_URL);
  return response.data;
};

export const createProject = async (
  project: Omit<Project, "id">
): Promise<Project> => {
  const response = await axios.post<Project>(API_URL, project);
  return response.data;
};

export const updateProject = async (
  id: number,
  project: Partial<Project>
): Promise<Project> => {
  const response = await axios.put<Project>(`${API_URL}/${id}`, project);
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
