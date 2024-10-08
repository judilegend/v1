import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";
import Tache from "./tache";
import Message from "./message";
class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: "user" | "admin" | "client";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin", "client"),
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);
User.hasMany(Tache, {
  foreignKey: "assignedUserId",
  as: "Taches",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
// User.hasMany(Message, {
//   foreignKey: "senderId",
//   as: "messages",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });

export default User;
