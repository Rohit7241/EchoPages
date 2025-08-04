import { ApiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import {Blog} from "../models/blog.model.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";


const Createblog=asynchandler(async(req,res)=>{
   const {title,content}=req.body
   const author=req.user
   if(!title||!content){
    throw new ApiError(404,"title and content needed")
   }
   console.log(author)
   const blog=await Blog.create({
    title,
    content,
    author:author._id
   })
   await User.findByIdAndUpdate(author._id,
    {$push:{blogs:blog._id}}
   )
   res.status(200).json(
    new ApiResponse(200,blog,"blog created")
   )
})
const UpdateBlog=asynchandler(async(req,res)=>{
   const {blogid}=req.params
   const {updatedblog,title}=req.body
   const blog=await Blog.findById(blogid)
 console.log(blog)
   if(blog.author.toString()!=req.user._id.toString())
      throw new ApiError(403,"cannot access this")
   const newblog=await Blog.findByIdAndUpdate(blogid,
      {
         title,
         content:updatedblog
      },
      {new:true}
   )
   res.status(200).json(
      new ApiResponse(200,newblog,"success")
   )
})
const deleteblog=asynchandler(async(req,res)=>{
   const {blogid}=req.params
   const blog=await Blog.findById(blogid)
   if(blog.author.toString()!=req.user._id.toString())
      throw new ApiError(403,"cannot access this")
  await Blog.findByIdAndDelete(blogid)
   res.status(200).json(
      new ApiResponse(200,"","deleted successfully")
   )
})
const like=asynchandler(async(req,res)=>{
   const {blogid}=req.params
   const user=req.user
   const blog=await Blog.findById(blogid)
   const alreadyliked=blog.likes.some(
  (id) => id.toString() === req.user._id.toString()
   );
   if(alreadyliked)
      blog.likes.pop(user._id)
   else 
      blog.likes.push(user._id)
   await blog.save()
   res.status(200).json(
      new ApiResponse(200,{},"liked/unliked")
   );
   })
const comment=asynchandler(async(req,res)=>{
   const {content}=req.body
   const {blogid}=req.params
   if(content==null){
      throw new ApiError(400,'Comment cannot be Empty')
   }
   const user=req.user
   const blog=await Blog.findById(blogid);
   if(!blog){
      throw new ApiError(404,"blog not found")
   }
   blog.comments.push({
      author:user._id,
      content
   })
   await blog.save()
   res.status(200)
   .json(
      new ApiResponse(200,blog,"successfull")
   )
})
const deletecomment=asynchandler(async(req,res)=>{
  const {blogid,commentid}=req.params
  
  const blog=await Blog.findById(blogid)
  if(!blog)
   throw new ApiError(404,"blog not found")
 const comment=blog.comments.find(
   (c)=>c._id.toString()==commentid
 )
 if(!comment){
   throw new ApiError(404,"comment not found")
 }
 
 if(comment.author.toString()!=req.user._id.toString())
  throw new ApiError(400,"U cannot delete this comment")
  
 blog.comments=blog.comments.filter(
   (c)=>c._id.toString()!=commentid
 )
 await blog.save()

 res.status(200).json(
   new ApiResponse(200,blog,"comment deleted successfully")
 )
})
const getallblogs=asynchandler(async(req,res)=>{
   const blogs=await Blog.find()
   .populate("author","username profilePic name")
   .populate("comments","content author")

   res.status(200).json(
      new ApiResponse(200,blogs,"fetched all")
   )
})
const getmyblogs=asynchandler(async(req,res)=>{
   
   const userid=req.user._id
   const user=await User.findById(userid);
   if(!user){
      throw new ApiError(404,"user not found")
   }
   const myblogs=await User.findById(userid)
   .populate("blogs","content title likes comments")

   res.status(200).json(
      new ApiResponse(200,myblogs,"blogs fetched")
   )
})
const getblogbyid=asynchandler(async(req,res)=>{
   const {blogid}=req.params
   const blog=await Blog.findById(blogid);
   if(!blog)
      throw new ApiError(404,"blog not found");
   res.status(200).json(
      new ApiResponse(200,blog,"fetched successfully")
   )
})
export {Createblog,UpdateBlog,deleteblog,like,comment,deletecomment,getallblogs,getmyblogs,getblogbyid}