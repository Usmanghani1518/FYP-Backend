import { Request } from "express";
import { IUser } from "../models/user.model"; 

export interface AuthRequest extends Request {
  user?: IUser; 
}

export interface AuthFileRequest extends Request {
  user?: IUser; 
  file?: Express.Multer.File; 
}
