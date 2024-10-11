import api from "./api";
import { Tache } from "../types/types";

export const getTaches = (activiteId: number) =>
  api.get<Tache[]>(`/tache/${activiteId}`);
export const createTache = (tache: Omit<Tache, "id">) =>
  api.post<Tache>("/tache", tache);
export const updateTache = (id: number, tache: Partial<Tache>) =>
  api.put<Tache>(`/tache/${id}`, tache);
export const deleteTache = (id: number) => api.delete(`/tache/${id}`);
