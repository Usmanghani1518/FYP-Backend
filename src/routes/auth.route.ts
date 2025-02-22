import express from "express"
import { accountActication, login, signup } from "../controllers/auth/auth.controller";
import { teacherLogin, teacherSignup } from "../controllers/auth/teacher.auth.controller";
const router = express.Router()


router.post("/signup",signup)
router.post("/login",login)
router.post("/activate",accountActication)
router.post("/teacher/signup", teacherSignup)
router.post("/teacher/login", teacherLogin)



export default router;