import { Router } from "express";
import { changeProfilePhoto, deleteUser, getuser, getuserbyid, loginUser, logoutuser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import multer from "multer";
import { verifyjwt } from "../middlewares/jwt.middleware.js";
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
router.route("/logout").post(formparser,verifyjwt,logoutuser)
router.route("/login").post(formparser,loginUser)
router.route("/:userid/getuser").get(formparser,getuserbyid)
router.route("/getuser").get(verifyjwt,getuser)

router.route("/updateProfile").post(
    verifyjwt,upload.fields([
        {
            name:"ProfilePic",
            maxCount:1
        }
    ])
    ,changeProfilePhoto)
export default router