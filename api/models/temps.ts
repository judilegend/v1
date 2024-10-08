import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Temps extends Model {
  public id!: number;
  public taskId!: number;
  public userId!: number;
  public startTime!: Date;
  public endTime!: Date;
  public duration!: number;
  public pomodoroCount!: number;
}

Temps.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pomodoroCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Temps",
  }
);

export default Temps;
