import Tache from "../models/tache";

export const createTache = async (data: Partial<Tache>) => {
  return await Tache.create(data);
};

export const getTachesByActiviteId = async (activiteId: number) => {
  return await Tache.findAll({ where: { activiteId } });
};

export const updateTache = async (id: number, data: Partial<Tache>) => {
  const tache = await Tache.findByPk(id);
  if (!tache) throw new Error("Tache not found");
  return await tache.update(data);
};

export const deleteTache = async (id: number) => {
  const tache = await Tache.findByPk(id);
  if (!tache) throw new Error("Tache not found");
  await tache.destroy();
};
