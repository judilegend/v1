import api from "./api";

export const getAllSalles = () => api.get("/api/salle");
export const createSalle = (name: string) => api.post("/api/salle", { name });
