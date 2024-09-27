import User from "../models/user";

export const getAllUsers = async () => {
  return User.findAll({ attributes: { exclude: ["password"] } });
};

export const getUserById = async (id: number) => {
  return User.findByPk(id, { attributes: { exclude: ["password"] } });
};

export const updateUser = async (id: number, data: Partial<User>) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user.update(data);
};

export const deleteUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  await user.destroy();
};
