import { Router } from "express";
import multer from "multer";
import { verifyjwt } from "../middlewares/jwt.middleware.js";
import { comment, Createblog, deleteblog, deletecomment, getallblogs, getblogbyid, getmyblogs, like, UpdateBlog } from "../controllers/blog.controller.js";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";
const formparser=multer().none()

const router=Router()

router.route("/Create").post(formparser,verifyjwt,Createblog)
router.route("/:blogid/update").post(formparser, verifyjwt, UpdateBlog)
router.route("/:blogid/delete").delete(verifyjwt,deleteblog)
router.route("/:blogid/like").post(verifyjwt,like)
router.route("/:blogid/comment").post(formparser,verifyjwt,comment)
router.route("/:blogid/comment/:commentid").post(verifyjwt,deletecomment)
router.route("/getallblogs").get(getallblogs)
router.route("/getmyblogs").get(verifyjwt,getmyblogs)
router.route("/:blogid/getblog").get(verifyjwt,getblogbyid)
export default router