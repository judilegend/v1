import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Tache from "./tache";

class Pomodoro extends Model {
  public id!: number;
  public tacheId!: number;
  public startTime!: Date;
  public endTime!: Date | null;
  public type!: "work" | "short_break" | "long_break";
  public completed!: boolean;
  public Tache?: Tache;
}

Pomodoro.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tacheId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("work", "short_break", "long_break"),
      defaultValue: "work",
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Pomodoro",
  }
);

export default Pomodoro;
