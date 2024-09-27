import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface MessageAttributes {
  id?: number;
  sender: string;
  content: string;
  timestamp?: Date;
}

class Message extends Model<MessageAttributes> implements MessageAttributes {
  public id!: number;
  public sender!: string;
  public content!: string;
  public timestamp!: Date;
}

Message.init(
  {
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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

export default Message;
