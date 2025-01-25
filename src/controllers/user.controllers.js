import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import nodemailer from "nodemailer";



 
const generateAccessToken = (user)=>{
    return jwt.sign({email:user.email},process.env.ACCESS_TOKEN,{
        expiresIn: '6h' 
    })
}

const generateRefreshToken = (user)=>{
    return jwt.sign({email:user.email},process.env.REFRESH_TOKEN,{
        expiresIn: '7d'
    })
}

// cloudinary img 
// const uploadImgToCloudinary = async (filePath) => {

//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET
//     })
//     console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
//     console.log(process.env.CLOUDINARY_API_KEY);
//     try {
//         const uploadResult = await cloudinary.uploader.upload(filePath, {
//           resource_type: "auto",
//         });
//         fs.unlinkSync(filePath);
//         return uploadResult.secure_url;
//       } catch (error) {
//         fs.unlinkSync(filePath);
//         return null;
//       }
// };

// nodemailer config

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ayaanabaf@gmail.com',
        pass: 'amwq vihl invy psui'
    }
  });

// register
const registerUser = async (req,res)=>{
    const {username,email,CNIC} = req.body;
    if(!username) return res.status(400).json({message: "username is required"});
    if(!email) return res.status(400).json({message: "email is required"});
    if (!CNIC) return res.status(400).json({ message: "CNIC is required" });
    const cnicRegex = /^[0-9]{5}-?[0-9]{7}-?[0-9]{1}$/;
    if (!cnicRegex.test(CNIC)) {
        return res.status(400).json({ message: "Invalid CNIC format. It should be 13 digits long, e.g., 12345-1234567-1" });
    }
    const user = await User.findOne({email: email},{CNIC,CNIC})
    if(user) return res.status(400).json({message: "email and CNIC already exists"});
    const randomPassword = Math.random().toString(36).slice(-8)

    // const imageUrl = await uploadImgToCloudinary(req.file.path);
    const userCreate = await User.create({
        username,
        email,
        password: randomPassword,
        CNIC,
    })

    const info = await transporter.sendMail({
        from: '"Ayaan Alam" <ayaanabaf@email.com>', // sender address
        to: email, // recipient's email
        subject: "Your Account Password ✔", // Subject line
        text: `Your password is: ${randomPassword}`, // plain text body
        html: `<b>Your password is: ${randomPassword}</b>`, // HTML body
      });
  
      console.log("Password email sent:", info.messageId);

    res.status(200).json({
        message : "User created successfully",
        data: userCreate,
    })

}

// login
const loginUser = async (req,res)=>{
    const {CNIC} = req.body;
    if(!CNIC) return res.status(400).json({message: "CNIC is required"});
    const cnicRegex = /^[0-9]{5}-?[0-9]{7}-?[0-9]{1}$/;
    if (!cnicRegex.test(CNIC)) {
        return res.status(400).json({ message: "Invalid CNIC format. It should be 13 digits long, e.g., 12345-1234567-1" });
    }
    // if(!password) return res.status(400).json({message: "password is required"});

    const user = await User.findOne({CNIC: CNIC})
    if(!user) return res.status(404).json({message: "no user found"});

    // const isPassword = await bcrypt.compare(password,user.password);
    // if(!isPassword) return res.status(404).json({message: "incorrect password"});

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,  
        sameSite: "strict", 
    });

    res.status(200).json({
        message: "Logged in successfully",
        accessToken,
        refreshToken,
        data: user

    })
}

// logout
const logoutUser = async (req,res)=>{
    res.clearCookie("refreshToken");
    res.status(200).json({message: "Logged out successfully"})
}

// refreshToken 
const refreshToken = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!refreshToken) return res.status(401).json({message: "No refresh token found"});
    const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN)
    const user = await User.findOne({email : decoded.email})
    if(!user) return res.status(404).json({message: "Invalid refresh token"});
    const generateToken = generateAccessToken(user)
    res.status(200).json({message: "access token generate",accessToken:generateToken})
    res.json({decoded})
}





export {registerUser,loginUser,logoutUser,refreshToken}





