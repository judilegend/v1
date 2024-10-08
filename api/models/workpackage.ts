import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Activity from "./activite";

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

WorkPackage.hasMany(Activity, {
  foreignKey: "workPackageId",
  as: "activities",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default WorkPackage;
