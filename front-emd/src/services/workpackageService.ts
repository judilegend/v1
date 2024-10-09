import api from "./api";
import { WorkPackage } from "../types/types";

export const getWorkPackages = (projectId: number) =>
  api.get<WorkPackage[]>(`/workpackage/project/${projectId}`);
export const createWorkPackage = (workPackage: Omit<WorkPackage, "id">) =>
  api.post<WorkPackage>("/workpackage", workPackage);
export const updateWorkPackage = (
  id: number,
  workPackage: Partial<WorkPackage>
) => api.put<WorkPackage>(`/workpackage/${id}`, workPackage);
export const deleteWorkPackage = (id: number) =>
  api.delete(`/workpackage/${id}`);
