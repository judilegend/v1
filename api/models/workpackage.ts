import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Activity from "./activite";

class WorkPackage extends Model {
  public id!: number;
  public projectId!: number;
  public name!: string;
  public description!: string;
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
