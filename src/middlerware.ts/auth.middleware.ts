import { Response, NextFunction } from "express";
import { decodeToken } from "../helpers/token";
import { User } from "../models/user.model";
import { AuthRequest } from "../types/AuthRequest";


export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  console.log("req.cookies", req.headers.cookie?.split(" ")[1])
  let token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1] || req.headers.cookie?.split(" ")[1];
  console.log("toke is this ", token.split("=")[1])


  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return
  }
  if (token) {
    token = token.split("=")[1];
  }

  try {
    const decoded = decodeToken(token) as { id: string; role: string };

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.status(401).json({ error: "Unauthorized: User not found" });
      return
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
    return
  }
};




export const authorize = (requiredRole: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {



    try {
      if (!req.user) {
        res.status(403).json({ error: "Access denied: Not authenticated" });
        return;
      }
      const user = await User.findById(req.user._id).select("role");

      if (!user) {
        res.status(403).json({ error: "Access denied: User not found" });
        return;
      }

      if (user.role !== requiredRole) {
        res.status(403).json({ error: `Access denied: Requires ${requiredRole} role` });
        return;
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error: Unable to verify role" });
      return;
    }
  };
};
