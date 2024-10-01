import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class WorkPackage extends Model {
  public id!: number;
  public projectId!: number;
  public name!: string;
  public description!: string;
  public status!: string;
}

WorkPackage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
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
    modelName: "WorkPackage",
  }
);

export default WorkPackage;
