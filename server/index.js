import dotenv from "dotenv"
import connectDB from "./src/db/index.js"
import {app} from "./app.js"
import cors from "cors"
dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error:",error)
        throw error
    })
    app.listen(process.env.PORT||8000,()=>{
        console.log(`listening on ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(err);
})