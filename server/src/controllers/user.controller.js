import {asynchandler} from '../utils/asynchandler.js'
import {ApiError} from '../utils/apiError.js'
import { User } from '../models/user.model.js'
import {ApiResponse} from '../utils/apiResponse.js'
import { uploadImage } from '../utils/cloudinary.js'
import bcrypt from "bcrypt"

const generateAccessAndRefreshToken=async function(userid){
   try
   {
   
    let user=await User.findById(userid)
    if(!user){
      
        throw new ApiError(404,"User not found")
    }
 
    const Accesstoken=user.generateAccessToken()
    const Refreshtoken=user.generateRefreshToken()
    user.refreshToken=Refreshtoken
   
    await user.save({validateBeforeSave:false})
    return {Accesstoken,Refreshtoken}}
    catch(err){
        throw new ApiError(500,"Something went wrong in generating tokens",[err]);
    }
}
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
        throw new ApiError(409,"UserName already taken")
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

  await User.findByIdAndDelete({_id:user._id})
  return res.status(201).json(
    new ApiResponse(200,{},"Deleted user successfully")
  )
})
const loginUser=asynchandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username&&!email){
        throw new ApiError(400,"Username or Email required")
    }
    const user=await User.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password")
    if(!user){
        throw new ApiError(401,"User not found")
    }
    let result=await bcrypt.compare(password,user.password)
    if(!result){
        throw new ApiError(400,"Incorrect Credentials")
    }
    const {Accesstoken,Refreshtoken}=await generateAccessAndRefreshToken(user._id);
    const loggedinuser=await User.findById(user._id).select("-refreshToken")

    const options={//to make cookies modifiable only through server not through frontend
        httpOnly:true,
        secure:isProduction,
        sameSite:"None",
    }
 
    return res.status(200)
    .cookie("AccessToken",Accesstoken,options)
    .cookie("RefreshToken",Refreshtoken,options)
    .json(
    new ApiResponse(200,{
        user:loggedinuser,Accesstoken,Refreshtoken
    },"user logged in successfully")
 )

})
const logoutuser=asynchandler(async(req,res)=>{
    const user=req.user
    User.findByIdAndUpdate(user._id,{
        refreshToken:""
    })
    return res
    .status(200)
    .clearCookie("AccessToken")
    .clearCookie("RefreshToken")
    .json(new ApiResponse(200,{},"user logged out successfully"))
})
const getuser=asynchandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
   if(!user)
    throw new ApiError(404,"User not Found")
  res.status(200).json(
    new ApiResponse(200,user,"fetched user")
  )
})
const getuserbyid=asynchandler(async(req,res)=>{
    const {userid}=req.params;
    const user=await User.findById(userid);
   if(!user)
    throw new ApiError(404,"User not Found")
  res.status(200).json(
    new ApiResponse(200,user,"fetched user")
  )
})
const changeProfilePhoto=asynchandler(async(req,res)=>{
    const profilepic=req.files?.ProfilePic[0].path;
    if(!profilepic)
        throw new ApiError(404,"Photo required");

  const profileurl=await uploadImage(profilepic)
  if(!profileurl)
    throw new ApiError(500,"Error uploading image");
    
    const user=await User.findByIdAndUpdate(req.user._id,
        {
            profilePic:profileurl.url
        }
    )
    res.status(200).json(
        new ApiResponse(200,profileurl.url,"Updated successfully")
    )
})
export {
    registerUser,
    deleteUser,
    loginUser,
    logoutuser,
    getuser,
    changeProfilePhoto,
    getuserbyid
}