import mongoose, { Schema, Document } from "mongoose";


interface StudentEnrolled {
  student?: mongoose.Types.ObjectId[]; 
  enrolledAt: Date

}
export interface ICourse extends Document {
  title: string;
  description: string;
  teacher: mongoose.Types.ObjectId; 
  price: number;
  language: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  thumbnail: string;
  rating?: number[],
  videos?: mongoose.Schema.Types.ObjectId[];
  studentsEnrolled?: StudentEnrolled[]; 
}

const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
    thumbnail: { type: String, required: true },
    language: { type: String, required: true },
    price: { type: Number, default: 0 },
    rating: {type:Number, default:[]},
    category: { type: String, required: true },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    studentsEnrolled: [
      {
        student : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        entrolledAt :{ type: Date, default: Date.now }
      }
    ]
    

  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
