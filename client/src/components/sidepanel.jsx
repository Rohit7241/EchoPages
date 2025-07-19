import { useState } from "react";

export default function Sidepanel({isopen,open}){
    
    
    return (
        <>
        <button onClick={()=>open()}
        className={`z-60 flex justify-center align-center text-base   ${isopen?"mr-35 p-2 bg-white w-30 text-slate-800 ":"mr-5 w-25 p-1 bg-white text-slate-800"}  hover:bg-indigo-400 hover:text-white text-lg  h-9 rounded `}>
         {isopen? "Close Menu":"Menu"} 
        </button>
        {isopen&&
        <div className={`fixed pt-15 top-0 z-50 bg-white/50 backdrop-invert backdrop-opacity-10 w-70 h-screen rounded-l right-0`}>
        <div className="ml-5 mt-5 flex font-semibold text-slate-600 flex-col">
            <a href="/home" className="hover:text-red-300">Home</a>  
            <a href="/home"className="mt-2 hover:text-red-300">My Blogs</a>  
            <a href="/home"className="mt-2 hover:text-red-300">My Profile</a>  
            <a href="/home"className="mt-2 hover:text-red-300">Create Blog</a>   
            <a href="/home"className="mt-2 hover:text-red-300">Login/Logout</a>  
        </div>
        </div>
        }
        </>
        
    )
}