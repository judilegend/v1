import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Activite from "./activite";

class PieceJointe extends Model {
  public id!: number;
  public activiteId!: number;
  public filename!: string;
  public originalName!: string;
  public path!: string;
  public mimetype!: string;
  public size!: number;
}

PieceJointe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    activiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Activites",
        key: "id",
      },
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PieceJointe",
  }
);

// Add relationship to Activite model
PieceJointe.belongsTo(Activite, {
  foreignKey: "activiteId",
  as: "activite",
});

export default PieceJointe;
