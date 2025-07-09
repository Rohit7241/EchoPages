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
    ref:"User"
},
comment:[{
    type:Schema.Types.ObjectId,
    ref:"Comment"
}],
like:[{
    type:Schema.Types.ObjectId,
    ref:"Like"
}]
},{
    timestamps:true
})

export const Blog=model("Blog",blogSchema)