import {model,Schema} from "mongoose"

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
},{
    timestamps:true
})


export const User=model("User",userSchema)