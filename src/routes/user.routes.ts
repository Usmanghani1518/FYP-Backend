import express from "express"
import { authorize, protect } from "../middlerware.ts/auth.middleware";
import { upload } from "../config/cloudinaryConfig";
import { teacherProfileUpdate } from "../controllers/teacher.controller";
const router = express.Router();




router.post("/update/teacher", protect , upload.single("profilePicture"), authorize('teacher') , teacherProfileUpdate )

export default router;