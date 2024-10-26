import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}
// Add verifyToken function for socket authentication
export const verifyToken = async (token: string): Promise<any> => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

// Middleware d'authentification
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
      role: string;
    };
    console.log("Decoded JWT:", decoded); // Log pour voir ce qui est décodé
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware d'autorisation (vérifier le rôle admin)
export const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    console.log(req.user?.role);
    return res
      .status(403)
      .json({ message: "Access denied. Admin role required." });
  }
};
export const authorizeClient = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "client") {
    next();
  } else {
    // console.log(req.user?.role);
    return res
      .status(403)
      .json({ message: "Access denied. client or admin  role required." });
  }
};
