import express from "express"
import { accountActication, deleteAllUser, login, signup, teacherSignup } from "../controllers/auth.controller";
const router = express.Router()


router.post("/signup",signup)
router.post("/login",login)
router.post("/activate",accountActication)
router.delete("/deleteAllUser",deleteAllUser)
router.post("/teacher/signup", teacherSignup)



export default router;