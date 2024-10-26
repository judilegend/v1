import Salle from "../models/salle";
import User from "../models/user";
import { Op } from "sequelize";

export const createSalle = async (
  name: string,
  creatorId: string,
  members: string[] = []
) => {
  const salle = await Salle.create({
    name,
    creatorId,
    members: [creatorId, ...members],
  });

  if (members.length > 0) {
    await salle.addUsers(members.map((id) => parseInt(id)));
  }

  return salle;
};
export const getAllSalles = async (userId: string) => {
  return Salle.findAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "name", "email", "is_online"],
        through: { attributes: [] },
      },
      {
        model: User,
        as: "creator",
        attributes: ["id", "name", "email"],
      },
    ],
    where: {
      members: {
        [Op.contains]: [userId],
      },
    },
  });
};

export const addUserToSalle = async (salleId: string, userId: string) => {
  const salle = await Salle.findByPk(salleId);
  if (!salle) {
    throw new Error("Salle not found");
  }
  await salle.addUser(parseInt(userId));
  return salle;
};

export const removeUserFromSalle = async (salleId: string, userId: string) => {
  const salle = await Salle.findByPk(salleId);
  if (!salle) {
    throw new Error("Salle not found");
  }
  await salle.removeUser(parseInt(userId));
  return salle;
};

export const getSalleById = async (salleId: string) => {
  const salle = await Salle.findByPk(salleId, {
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "name", "email", "is_online"],
      },
    ],
  });

  if (!salle) {
    throw new Error("Salle not found");
  }

  return salle;
};
