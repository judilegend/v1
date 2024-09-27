import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

// interface ProjectAttributes {
//   id?: number;
//   title: string;
//   description: string;
//   budget: number;
//   deadline: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

class Project extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public budget!: number;
  public deadline!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    budget: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Project",
  }
);

export default Project;
