import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Pomodoro from "./pomodoro";
import User from "./user";
import Sprint from "./sprint";

class Tache extends Model {
  public id!: number;
  public sprintId!: number | null;
  public title!: string;
  public description!: string;
  public status!: "todo" | "in_progress" | "done";
  public activiteId!: number;
  public assignedUserId!: number | null;
  public estimatedPomodoros!: number;
  public completedPomodoros!: number;
  public urgency!: string;
  public importance!: string;
  public pomodoros?: Pomodoro[];
}

Tache.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    sprintId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activiteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
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
    assignedUserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    estimatedPomodoros: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 4,
      },
    },
    completedPomodoros: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    urgency: {
      type: DataTypes.ENUM("urgent", "not-urgent"),
      allowNull: false,
      defaultValue: "not-urgent",
    },
    importance: {
      type: DataTypes.ENUM("important", "not-important"),
      allowNull: false,
      defaultValue: "not-important",
    },
  },
  {
    sequelize,
    modelName: "Tache",
  }
);
Tache.hasMany(Pomodoro, {
  foreignKey: "tacheId",
  as: "pomodoros",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Tache;
