import {asynchandler} from '../utils/asynchandler.js'
import {ApiError} from '../utils/apiError.js'
import { User } from '../models/user.model.js'
import {ApiResponse} from '../utils/apiResponse.js'
import { uploadImage } from '../utils/cloudinary.js'
import bcrypt from "bcrypt"

const registerUser=asynchandler(async(req,res)=>{
    //steps:
    //get user details from frontend
    //validate them
    //check if user exists already
    //upload the profilepic and cover image on cloudinary
    //create user object
    //remove password and refreshtoken from response
    //return response
    const {name,email,username,password}=req.body
    if([name,email,username,password].some((field)=>{
        field?.trim()===""
    })){
        throw new ApiError(400,"All fields are must")
    }
   
    const existUser=await User.findOne({username})

    if(existUser){
        throw new ApiError(409,"User already exists")
    }
    const profilepicLocal=req.files?.ProfilePic[0].path
    let coverImageLocal;
    if(req.files&&req.files.coverImage){
        coverImageLocal=req.files.coverImage[0].path;
    }
    else{
        coverImageLocal=""
    }

    if(!profilepicLocal){
        throw new ApiError(400,"profile picture is required")
    }
    const ProfilePic=await uploadImage(profilepicLocal)
    const coverImage=await uploadImage(coverImageLocal)

    if(!ProfilePic){
        throw new ApiError(400,"Profile picture required")
    }
    let newpassword
   const hashedPassword = await bcrypt.hash(password, 10)
   const user=await User.create({
    name,
    profilePic:ProfilePic.url,
    coverImage:coverImage.url||"",
    email,
    password:hashedPassword,
    username:username.toLowerCase(),
   })

   const createduser=await User.findById(user._id)
   if(!createduser){
    throw new ApiError(500,"something went wrong")
   }

   return res.status(201).json(
    new ApiResponse(200,createduser,"User registered")
   )
})
const deleteUser=asynchandler(async(req,res)=>{
    console.log(req.body);
  const {username,password}=req.body
  const user = await User.findOne({ username}).select('+password')
  if(!user){
    throw new ApiError(401,"User does not exist")
  }

  let result=await bcrypt.compare(password, user.password);

  if(!result)
    throw new ApiError(400,"password incorrect")

  await User.deleteOne({_id:user._id})
  return res.status(201).json(
    new ApiResponse(200,{},"deleted user successfully")
  )
})


export {
    registerUser,
    deleteUser
}