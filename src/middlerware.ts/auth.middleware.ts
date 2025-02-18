import {  Response, NextFunction } from "express";
import { decodeToken } from "../helpers/token";
import {  User } from "../models/user.model";
import { AuthRequest } from "../types/AuthRequest";


export const protect = async (req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
  let token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return
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
  return async (req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
    console.log("90-0---------------0-")
   
    if (!req.user) {
       res.status(403).json({ error: "Access denied: Not authenticated" });
       return 
    }

    try {
      const user = await User.findById(req.user._id).select("role");
      if (!user) {
         res.status(403).json({ error: "Access denied: User not found" });
         return
      }
      if (user.role !== requiredRole) {
         res.status(403).json({ error: `Access denied: Requires ${requiredRole} role` });
         return
      }
      next();

    } catch (error) {
       res.status(500).json({ error: "Server error: Unable to verify role" });
       return
    }


  };
};
