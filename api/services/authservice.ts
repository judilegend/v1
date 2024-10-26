import jwt from "jsonwebtoken";
import User from "../models/user";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const user = await User.create({ username, email, password });
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );

  return { user, token };
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
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );

  // Update online status
  await user.update({ is_online: true });

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      is_online: user.is_online,
    },
    token,
  };
};
