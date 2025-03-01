import { SocialAccount, Teacher } from "./../models/teacher.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { AuthRequest } from "../types/AuthRequest";
import { cloudinary } from "../config/cloudinaryConfig";
import { Course } from "../models/course.model";

export const teacherProfileUpdate = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    let { email, name, password, headline, experience, bio, socialAccounts } = req.body;
   
    const req_user = req.user?._id;

    const user_obj = await User.findById(req_user);
    const teacher = await Teacher.findOne({ user: req_user });

    if (!user_obj || !teacher) {
      res.status(404).json({ success: false, detail: "User not found" });
      return;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        res
          .status(400)
          .json({ success: false, detail: "Invalid email format" });
        return;
      }
      const email_already_exists = await User.findOne({ email });

      if (email_already_exists) {
        res.status(400).json({ success: false, detail: "User already exists" });
        return;
      }
      user_obj.email = email;
    }

    if (password) {
      if (password.length < 8) {
        res
          .status(400)
          .json({
            success: false,
            detail: "Password length must be 8 characters.",
          });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user_obj.password = hashedPassword;
    }
    if (name) user_obj.name = name;
    if (headline) teacher.headline = headline;
    if (experience) teacher.experience = experience;
    if (bio) teacher.bio = bio;
    if (socialAccounts) {
      teacher.socialAccounts = socialAccounts;
    }
    if (req.file){
            const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            const result = await cloudinary.uploader.upload(fileBase64, {
              folder: "uploads",
              resource_type: "image",
            });
    user_obj.profilePicture = result?.secure_url
    }

    await user_obj.save();
    await teacher.save();

    res
      .status(200)
      .json({ success: true, detail: "Profile updated successfully" });
    return;
  } catch (error) {
    console.error("Updated Error:", error);
    res.status(500).json({ success: false, detail: "Internal Server Error" });
    return;
  }
};



export const teacherStatics = async(req: AuthRequest ,  res : Response):Promise<void> => {
  try {
      const courses = await Course.find({teacher_id: req.user?._id} , "studentsEnrolled price")
      if (courses.length === 0) {
         res.json({ success: true, data: { courseCount: 0, totalStudentEnrolled: 0, totalEarning: 0 } });
         return
      }
      
      const courseCount = courses.length;
      const totalStudentEnrolled = courses.reduce((sum, course)=> sum + (course.studentsEnrolled?.length || 0) , 0)
      const totalEarning = courses.reduce((sum ,course) => sum + course.price, 0)
      res.json({
        success : true,
        data : {
          courseCount,
          totalStudentEnrolled,
          totalEarning
        }
      })
  } catch (error) {
    console.error("Updated Error:", error);
    res.status(500).json({ success: false, detail: "Internal Server Error" });
    return;
  }
}