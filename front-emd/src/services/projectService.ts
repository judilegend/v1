import api from "./api";
import { Project } from "../types/types";

export const getProjects = () => api.get<Project[]>("/project");
export const createProject = (project: Omit<Project, "id">) =>
  api.post<Project>("/project", project);
export const updateProject = (id: number, project: Partial<Project>) =>
  api.put<Project>(`/project/${id}`, project);
export const deleteProject = (id: number) => api.delete(`/project/${id}`);
