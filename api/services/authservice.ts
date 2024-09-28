import jwt from "jsonwebtoken";
import User from "../models/user";

export const registerUser = async (
  username: string,
  email: string,
  password: string
  // role: string
) => {
  const user = await User.create({ username, email, password });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role }, // Assurez-vous que le rôle est inclus
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
  console.log("====================================");
  console.log(token);
  console.log("====================================");

  return { user, token };
};
