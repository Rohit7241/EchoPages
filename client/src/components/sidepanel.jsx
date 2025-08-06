import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import React from "react";
export default function Sidepanel({isopen,open,underline,log}){
    const [confirm,setconfirm]=useState(false);
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
       {confirm&&<div className="bg-white rounded-xl border-black h-auto min-w-100 mt-30 p-5">
         <h1>Confirm Logout ?</h1>
         <div className="flex justify-between mt-10">
            <p className="text-blue-500 cursor-pointer" onClick={logoutuser}>Okay</p>
         <p className="text-red-500 cursor-pointer" onClick={()=>setconfirm(false)}>Cancel</p>
         </div>
        </div>}
        <button onClick={()=>open()}
        className={`z-60 flex justify-center align-center text-base   ${(isopen)?"mr-35 p-2 bg-white w-30 text-slate-800 ":"mr-5 w-25 p-1 bg-white text-slate-800"}  hover:bg-indigo-400 hover:text-white text-lg  h-9 rounded `}>
         {(isopen)? "Close Menu":"Menu"} 
        </button>
        {isopen&&
        <div className={`fixed pt-15 top-0 z-50 bg-white/50 backdrop-invert backdrop-opacity-10 w-70 h-screen rounded-l right-0`}>
        <div className="ml-5 mt-5 flex font-semibold text-slate-600 flex-col">
            <Link to="/home" className={`hover:text-red-300  cursor-pointer ${underline=="home"?"underline":""}`}>Home</Link>  
            <Link to="/myprofile" className={`mt-2 hover:text-red-300 cursor-pointer  ${underline=="mypro"?"underline":""}`}>My Profile</Link>  
            <Link to="/createblog" className={`mt-2 hover:text-red-300 cursor-pointer ${underline=="createblog"?"underline":""}`}>Create Blog</Link>   
            <p onClick={()=>setconfirm(true)} className="mt-2 cursor-pointer hover:text-red-300">Logout</p>
        </div>
        </div>
        }
        </>
        
    )
}