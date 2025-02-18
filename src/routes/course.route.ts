import express from "express"
import { authorize, protect } from "../middlerware.ts/auth.middleware"
import { createCourse, getTeacherCourses } from "../controllers/course.controller"
import { upload } from "../config/cloudinaryConfig";

const router = express.Router()
router.post("/create", protect , upload.single("thumbnail"), authorize('teacher') , createCourse )
router.get("/teacher/:teacherId", protect , authorize('teacher') , getTeacherCourses )


export default router;