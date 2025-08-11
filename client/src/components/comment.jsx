import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Comment({blogid,cmtid,content,user,author}){
  const [username,setuser]=useState("")
  const [confdel,setconfdel]=useState(false);
  const deletecomment=async()=>{
    const res=await axios.post(`https://echopages3.onrender.com/api/v1/blog/${blogid}/comment/${cmtid}`,{},{withCredentials:true})
    console.log(res);
    setconfdel(false);
    window.location.reload();
  }
   const getuserbyid=async(user)=>{
   try {
          const commentuser=await axios.get(`https://echopages3.onrender.com/api/v1/users/${user}/getuser`,{withCredentials:true})
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
         <div className="flex justify-between">
           <p>{content}</p>
          {author&&!confdel&&<button onClick={()=>setconfdel(true)} className="bg-red-300 p-2 rounded">Delete</button>}
          {confdel&&<div className="p-2 bg-white">
             <h1>Confirm Delete</h1>
            <div className="flex justify-between">
               <button className="bg-red-300 p-2 rounded" onClick={()=>{deletecomment()}}>yes</button>
             <button className="bg-blue-500 p-2 rounded" onClick={()=>{setconfdel(false)}}>Cancel</button>
            </div>
            </div>}
         </div>
        </div>
        </>
    )
}