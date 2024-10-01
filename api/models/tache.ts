import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Tache extends Model {
  public id!: number;
  public activiteId!: number;
  public name!: string;
  public description!: string;
  public status!: string;
}

Tache.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    activiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("todo", "in_progress", "done"),
      defaultValue: "todo",
    },
  },
  {
    sequelize,
    modelName: "Tache",
  }
);

export default Tache;
