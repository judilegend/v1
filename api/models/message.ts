import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

class Message extends Model {
  public id!: number;
  public senderId!: number;
  public receiverId?: number;
  public channelId?: number;
  public content!: string;
  public fileUrl?: string;
  public messageType!: "text" | "file" | "image";
  public timestamp!: Date;
}

Message.init(
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
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    channelId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    messageType: {
      type: DataTypes.ENUM("text", "file", "image"),
      allowNull: false,
      defaultValue: "text",
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Message",
  }
);

// Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
// Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

export default Message;
