import express from "express"
import { registerUser,loginUser,logoutUser,refreshToken, sendEmail } from "../controllers/user.controllers.js"

const router = express.Router()

router.post("/register", registerUser);
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.post("/refreshToken",refreshToken)
router.get("/sendemail", sendEmail);





export default router