import { DataTypes, Model, QueryTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

interface UnreadCount {
  receiver_id: number;
  unread_count: number;
}

interface LatestMessage {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  read: boolean;
  created_at: Date;
  updated_at: Date;
}

interface ConversationMessage {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  read: boolean;
  created_at: Date;
  updated_at: Date;
  sender?: User;
  receiver?: User;
}

class DirectMessage extends Model {
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public content!: string;
  public read!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  static async getConversationUsingProc(
    user1Id: string,
    user2Id: string,
    limit = 50,
    offset = 0
  ): Promise<ConversationMessage[]> {
    try {
      const [results] = await sequelize.query(
        "CALL sp_get_conversation(:user1Id, :user2Id, :limit, :offset)",
        {
          replacements: { user1Id, user2Id, limit, offset },
          type: QueryTypes.RAW,
        }
      );

      return Array.isArray(results) ? (results as ConversationMessage[]) : [];
    } catch (error) {
      console.error("Error in getConversationUsingProc:", error);
      return [];
    }
  }
  static async markMessagesReadUsingProc(
    receiverId: string,
    senderId: string
  ): Promise<void> {
    await sequelize.query(
      "CALL sp_mark_messages_read(:receiverId, :senderId)",
      {
        replacements: { receiverId, senderId },
        type: QueryTypes.RAW,
      }
    );
  }

  static async getLatestMessages(): Promise<LatestMessage[]> {
    return sequelize.query("SELECT * FROM vw_latest_messages", {
      type: QueryTypes.SELECT,
    });
  }

  static async getUnreadCount(userId: string): Promise<UnreadCount[]> {
    return sequelize.query(
      "SELECT receiver_id, unread_count FROM vw_unread_messages_count WHERE receiver_id = :userId",
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );
  }
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
      field: "sender_id",
    },
    receiverId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "receiver_id",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "DirectMessage",
    tableName: "direct_messages",
    timestamps: true,
    underscored: true,
  }
);

DirectMessage.belongsTo(User, {
  as: "sender",
  foreignKey: "sender_id",
});

DirectMessage.belongsTo(User, {
  as: "receiver",
  foreignKey: "receiver_id",
});

export default DirectMessage;
