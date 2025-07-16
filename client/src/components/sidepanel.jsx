import { useState } from "react";
import Home from "../pages/home";

export default function Sidepanel({isopen,open}){
    
   
    return (
        <>
        <button onClick={()=>open()}
        className="text-base mr-5 bg-indigo-200 hover:bg-indigo-400 hover:text-slate-300 w-18 h-8 rounded text-slate-500">
          Menu  
        </button>
        {isopen&&
        <div className="fixed top-0 bg-white/30 backdrop-invert backdrop-opacity-20 w-40 h-full right-0 mt-15">
        <div className="ml-5 mt-5 flex text-slate-600 flex-col">
            <a href="/home " className="hover:text-sky-300">Home</a>  
            <a href="/home"className="mt-2 hover:text-sky-300">My Blogs</a>  
            <a href="/home"className="mt-2 hover:text-sky-300">My Profile</a>  
            <a href="/home"className="mt-2 hover:text-sky-300">Create Blog</a>  
            <a href="/home"className="mt-2 hover:text-sky-300">Login/Logout</a>  
        </div>
        </div>
        }
        </>
        
    )
}