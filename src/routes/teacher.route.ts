import express from "express"
import { authorize, protect } from "../middlerware.ts/auth.middleware"
import { teacherProfileUpdate, teacherStatics } from "../controllers/teacher.controller";

const router = express.Router()
router.post("/update", protect , authorize('teacher') , teacherProfileUpdate )
router.get("/stats", protect , authorize('teacher') , teacherStatics )



export default router;