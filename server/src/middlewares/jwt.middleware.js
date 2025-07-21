import jwt  from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";



const verifyjwt=asynchandler(async(req,res,next)=>{
 try
 {const token=req.cookies.AccessToken
    if(!token){
    throw new ApiError(404,"unauthorized request")
    }
 const decode=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 const user=await User.findById(decode._id)
 if(!user){
    throw new ApiError(404,"invalid access token")
 }
 req.user=user
next()}
catch(err){
    throw new ApiError(500,"error verifying jwt",[err])
}
})

export {verifyjwt}