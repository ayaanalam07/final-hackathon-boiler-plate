import express from "express"
import { registerUser,loginUser,logoutUser,refreshToken, sendEmail } from "../controllers/user.controllers.js"
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router()

router.post("/register", upload.single("image"), registerUser);
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.post("/refreshToken",refreshToken)
router.get("/sendemail", sendEmail);





export default router