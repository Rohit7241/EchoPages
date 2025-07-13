import { Router } from "express";
import { deleteUser, loginUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import multer from "multer";
const formparser=multer().none()

const router=Router();
router.route("/register").post(
    upload.fields([
        {
            name:"ProfilePic",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ])
    ,registerUser)


router.route("/delete").post(formparser,deleteUser)


router.route("/login").post(formparser,loginUser)
export default router