import express from "express"
import { Google, Login, signup } from "../controllers/auth.controller.js"

const router=express.Router()


router.post("/signup",signup)
router.post("/signin",Login)
router.post("/google",Google)


export default router