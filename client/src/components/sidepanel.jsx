import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import React from "react";
export default function Sidepanel({isopen,open,underline,log}){
    const navigate=useNavigate()
    const logoutuser=async()=>{
        try {
             const res=await axios.post("http://localhost:8000/api/v1/users/logout",{},
         {withCredentials:true})
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <button onClick={()=>open()}
        className={`z-60 flex justify-center align-center text-base   ${isopen?"mr-35 p-2 bg-white w-30 text-slate-800 ":"mr-5 w-25 p-1 bg-white text-slate-800"}  hover:bg-indigo-400 hover:text-white text-lg  h-9 rounded `}>
         {isopen? "Close Menu":"Menu"} 
        </button>
        {isopen&&
        <div className={`fixed pt-15 top-0 z-50 bg-white/50 backdrop-invert backdrop-opacity-10 w-70 h-screen rounded-l right-0`}>
        <div className="ml-5 mt-5 flex font-semibold text-slate-600 flex-col">
            <Link to="/home" className={`hover:text-red-300 ${underline=="home"?"underline":""}`}>Home</Link>  
            <Link to="/myprofile" className={`mt-2 hover:text-red-300  ${underline=="mypro"?"underline":""}`}>My Profile</Link>  
            <Link to="/createblog" className={`mt-2 hover:text-red-300  ${underline=="createblog"?"underline":""}`}>Create Blog</Link>   
            {log=="true"&&<button onClick={logoutuser} className="mt-2 hover:text-red-300">Logout</button>  }
        </div>
        </div>
        }
        </>
        
    )
}