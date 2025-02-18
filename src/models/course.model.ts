import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  teacher: mongoose.Types.ObjectId; 
  price: number;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  thumbnail: string;
  videos?: mongoose.Schema.Types.ObjectId[];
  studentsEnrolled: mongoose.Types.ObjectId[]; 
}

const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: String, required: true },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
