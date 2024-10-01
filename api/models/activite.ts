import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Activite extends Model {
  public id!: number;
  public workPackageId!: number;
  public name!: string;
  public description!: string;
  public status!: string;
}

Activite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    workPackageId: {
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
    modelName: "Activite",
  }
);

export default Activite;
