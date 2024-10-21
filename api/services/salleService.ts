import  Salle  from "../models/salle";
export const createSalle = async (name: string) => {
  return Salle.create({ name });
};

export const getAllSalles = async () => {
  return Salle.findAll();
};
