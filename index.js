import express from 'express'
import dotenv from "dotenv";
import connectDB from './src/db/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import UserRouter from "./src/routes/user.routes.js"
import BlogRouter from "./src/routes/blog.routes.js"
import loanRouter from "./src/routes/loan.routes.js"



dotenv.config()


const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/users",UserRouter)
app.use("/api/blogs",BlogRouter)
app.use("/api/loans",loanRouter)



app.get("/", (req, res) => {
  res.send("Hello World!");
});


connectDB()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
      });
})
.catch((err)=>{
    console.log("MONGO DB connection failed !!! ", err);
})