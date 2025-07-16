import { model,Schema } from "mongoose";

const likeSchema=new Schema(
    {
     likedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     blog:{
        type:Schema.Types.ObjectId,
        ref:"Blog",
        required:true
     }
    }
)


export const Like=model("Like",likeSchema)