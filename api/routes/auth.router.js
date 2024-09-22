import express from "express"
import { Login, signup } from "../controllers/auth.controller.js"

const router=express.Router()


router.post("/signup",signup)
router.post("/signin",Login)


export default router