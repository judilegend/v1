import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

class DirectMessage extends Model {
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public content!: string;
  public read!: boolean;
  public timestamp!: Date;
}

DirectMessage.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    receiverId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "DirectMessage",
  }
);

DirectMessage.belongsTo(User, { as: "sender", foreignKey: "senderId" });
DirectMessage.belongsTo(User, { as: "receiver", foreignKey: "receiverId" });

export default DirectMessage;
