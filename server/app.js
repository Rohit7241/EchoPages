import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"

const app=express();

app.use(cors({
  origin: "https://echo-pages2.vercel.app",
  origin:"http://localhost:5173/",
  credentials: true
}));

app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from "./src/routes/user.route.js"
import blogrouter from "./src/routes/blog.route.js"
app.use("/api/v1/users",userRouter)
app.use("/api/v1/blog",blogrouter)

export {app};