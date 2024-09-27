import { Request, Response } from "express";
import * as authService from "../services/authservice";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.registerUser(
      username,
      email,
      // role,
      password
    );
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(401).json({ message: "Login failed", error: error.message });
  }
};
