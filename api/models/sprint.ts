import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Task from "./tache";
import Tache from "./tache";

class Sprint extends Model {
  public id!: number;
  public projectId!: number;
  public name!: string;
  public startDate!: Date;
  public endDate!: Date;
  public goal!: string;
  public progress!: number;
  public status!: "planned" | "in_progress" | "completed";
  public Tasks!: Task[];
}

Sprint.init(
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    goal: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("planned", "in_progress", "completed"),
      allowNull: false,
      defaultValue: "planned",
    },
  },
  {
    sequelize,
    modelName: "Sprint",
  }
);
Sprint.hasMany(Tache, {
  foreignKey: "sprintId",
  as: "Taches",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
// Sprint.hasMany(Task, { foreignKey: "sprintId", as: "Tasks" });
// Task.belongsTo(Sprint, { foreignKey: "sprintId" });

export default Sprint;
