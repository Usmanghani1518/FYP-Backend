import express from "express"
import { authorize, protect } from "../middlerware.ts/auth.middleware"
import { teacherProfileUpdate } from "../controllers/teacher.controller";

const router = express.Router()
router.post("/update", protect , authorize('teacher') , teacherProfileUpdate )


export default router;