import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Comment({content,user}){
  const [username,setuser]=useState("")
   const getuserbyid=async(user)=>{
   try {
          const commentuser=await axios.get(`http://localhost:8000/api/v1/users/${user}/getuser`,{withCredentials:true})
          setuser(commentuser.data.data.username);
        } catch (error) {
          console.log(error)
        }
  }
  useEffect(()=>{
    getuserbyid(user); 
  },[])
    return(
        <>
        <div className="w-auto h-auto m-3 bg-blue-100 p-5 rounded-md">
          <h1 className="font-bold">{username}</h1>
          <p>{content}</p>
        </div>
        </>
    )
}