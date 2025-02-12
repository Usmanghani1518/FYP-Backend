import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { decodeToken } from "./token";
import { IUser, User } from "../models/user.model";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser; 
  }
}
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// ✅ Auth Middleware (Checks if User is Logged In)
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = decodeToken(token) as { id: string; role: string };

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const authorize = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({ error: "Access denied: Not authenticated" });
    }
    try {
      const user = await User.findById(req.user._id).select("role");
      if (!user) {
        return res.status(403).json({ error: "Access denied: User not found" });
      }
      if (user.role !== requiredRole) {
        return res.status(403).json({ error: `Access denied: Requires ${requiredRole} role` });
      }
      next();

    } catch (error) {
      return res.status(500).json({ error: "Server error: Unable to verify role" });
    }


  };
};
