import express from "express"
import { accountActication, login, signup } from "../controllers/auth.controller";
const router = express.Router()


router.post("/signup",signup)
router.post("/login",login)
router.post("/activate",accountActication)



export default router;