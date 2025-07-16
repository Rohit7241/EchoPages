import {model,Schema} from "mongoose"
import jwt from "jsonwebtoken"
const userSchema=new Schema({
name:{
    type:String,
    lowercase:true,
    required:true
},
username:{
    type:String,
    unique:true,
    required:true,
    lowercase:true,
    trim:true
},
email:{
    type:String,
    required:true,
    lowercase:true,
    trim:true
},
password:{
    type:String,
    required:true,
    minlength:8,
    select:false
},
profilePic:{
    type:String,
    required:true
},
coverImage:{
    type:String,
    required:true
},
blogs:[{
    type:Schema.Types.ObjectId,
    ref:"Blog"
}],
refreshToken:{
    type:String,
}
},{
    timestamps:true
})

userSchema.methods.generateAccessToken=function(){
  return jwt.sign({
    _id:this._id,
    username:this.username,
    email:this.email
  },process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
})
}

userSchema.methods.generateRefreshToken=function(){
  return jwt.sign({
    _id:this._id,
  },process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
})
}

export const User=model("User",userSchema)