import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Salle extends Model {
  public id!: number;
  public name!: string;
}

Salle.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Salle",
  }
);

export default Salle;
