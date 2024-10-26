import PieceJointe from "../models/piece_jointe";

export const pieceJointeService = {
  async create(data: {
    activiteId: number;
    filename: string;
    originalName: string;
    path: string;
    mimetype: string;
    size: number;
  }) {
    return await PieceJointe.create(data);
  },

  async findByActiviteId(activiteId: number) {
    return await PieceJointe.findAll({
      where: { activiteId },
    });
  },

  async delete(id: number) {
    return await PieceJointe.destroy({
      where: { id },
    });
  },

  async findById(id: number) {
    return await PieceJointe.findByPk(id);
  },
};
