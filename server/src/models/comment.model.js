import {model,Schema} from "mongoose"

const commentSchema= new Schema({
  author:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  blog:{
    type:Schema.Types.ObjectId,
    ref:"Blog",
    required:true
  },
  content:{
    type:String,
    trim:true,
    maxlength:100,
    required:true
  }
},{
    timestamps:true
})


export const Comment=model("Comment",commentSchema)