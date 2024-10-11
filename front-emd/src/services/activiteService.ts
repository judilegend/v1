import api from "./api";
import { Activite } from "../types/types";

export const getActivites = (workPackageId: number) =>
  api.get<Activite[]>(`/activite/workpackage/${workPackageId}`);
export const createActivite = (activite: Omit<Activite, "id">) =>
  api.post<Activite>("/activite", activite);
export const updateActivite = (id: number, activite: Partial<Activite>) =>
  api.put<Activite>(`/activite/${id}`, activite);
export const deleteActivite = (id: number) => api.delete(`/activite/${id}`);
