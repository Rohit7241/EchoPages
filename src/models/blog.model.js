import { model,Schema } from "mongoose";

const blogSchema=new Schema({
title:{
    type:String,
    required:true,
    trim:true,
    maxlength:150
},
content:{
    type:String,
    required:true
},
author:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
},
comments:[    
    {
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
],
likes:[{
    type:Schema.Types.ObjectId,
    ref:"User"
}]
},{
    timestamps:true
})

export const Blog=model("Blog",blogSchema)