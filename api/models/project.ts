import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import WorkPackage from "./workpackage";

class Project extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public clientName!: string;
  public clientSurname!: string;
  public clientPhone!: string;
  public clientEmail!: string;
  public requestedBudgetLowwer!: number | null;
  public requestedBudgetUpper!: number | null;
  public deadline!: Date;
  public status!: string;
  public progress!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientSurname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clientEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    requestedBudgetLowwer: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    requestedBudgetUpper: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("submitted", "in_review", "approved", "rejected"),
      defaultValue: "submitted",
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Project",
  }
);

Project.hasMany(WorkPackage, {
  foreignKey: "projectId",
  as: "workPackages",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Project;
