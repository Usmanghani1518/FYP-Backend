
import {Response} from "express"
import { cloudinary } from "../config/cloudinaryConfig";
import { Course } from "../models/course.model";
import { AuthRequest } from "../types/AuthRequest";



export const createCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, price, category, level,language } = req.body;

    if (!title || !description || !price || !category || !level ||!language) {
      res.status(400).json({ success: false, detail: "All fields are required" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ success: false, detail: "No thumbnail attached." });
      return;
    }
    const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "uploads",
      resource_type: "image",
    });

    const course = await Course.create({
      title,
      description,
      teacher: req.user?._id,
      price,
      category,
      level,
      thumbnail: result?.secure_url,
      language
    });

    res.status(201).json({
      success: true,
      detail: "Course Created Successfully",
      course,
    });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, detail: "Internal Server Error" });
  }
};



  export const getTeacherCourses = async (req: AuthRequest , res:Response):Promise<void> => {
    try {
      const teacherId = req.user?._id;
      if (!teacherId) {
         res.status(400).json({ success: false, detail: "Teacher ID is required." });
         return
      }
      const courses = await Course.find({teacher :teacherId})
      if (courses.length === 0) {
         res.status(404).json({ success: false, detail: "No courses found for this teacher." });
         return
      }
      res.status(200).json({ courses });
      return
    } catch (error) {
      console.error(error);
    res.status(500).json({ success: false, detail: "Internal Server Error" });
    
    }
  }
  