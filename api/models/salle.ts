import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

class Salle extends Model {
  public id!: number;
  public name!: string;
  public creatorId!: number;
  public members!: number[];

  public async addUsers(userIds: number[]) {
    this.members = [...this.members, ...userIds];
    await this.save();
  }
  public async addUser(userId: number) {
    this.members = [...this.members, userId];
    await this.save();
  }
  public async removeUser(userId: number) {
    this.members = this.members.filter((id) => id !== userId);
    await this.save();
  }
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
    creatorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    members: {
      type: DataTypes.TEXT,
      defaultValue: "[]",
      get() {
        const rawValue = this.getDataValue("members");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: number[]) {
        this.setDataValue("members", JSON.stringify(value));
      },
    },
  },
  {
    sequelize,
    modelName: "Salle",
  }
);

// Define associations
Salle.belongsTo(User, { as: "creator", foreignKey: "creatorId" });
Salle.belongsToMany(User, { through: "SalleMembers", as: "users" });
User.belongsToMany(Salle, { through: "SalleMembers", as: "salles" });

export default Salle;
