import NavBar from "../components/navbar"
import image from "../assets/profileimage.webp"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
export default function BlogPage(){
  const location = useLocation();
  const { id } = location.state || {}; 
  const [blog,setblog]=useState()
  const [title,settitle]=useState()
  const [content,setcontent]=useState()
    useEffect(()=>{
      const getblog=async ()=>{
       try {
             const res=await axios.get(`http://localhost:8000/api/v1/blog/${id}/getblog`,
                    {withCredentials:true}
                )
                setblog(res.data.data)
                settitle(res.data.data.title);
                setcontent(res.data.data.content);
       } catch (error) {
        console.log(error)
       }
      }
      getblog();
     
    },[])
   
    return (
        <>
        <div className="min-h-screen h-auto w-full bg-sky-200">
            <NavBar/>
       <div className="  p-6 pt-24">
      <div className="h-auto w-auto bg-slate-400 rounded-xl m-5 mx-auto p-5 flex items-center ">
        <div className="h-20 w-20 rounded-full bg-center bg-cover" style={{backgroundImage:`url(${image})`}}></div>
        <div>
            <h1 className="ml-5 text-xl">Author Name: Alex Stone</h1>
            <h1 className="ml-5 text-sm">Published : 11/2/2020</h1>
        </div>
      </div>
         <div className="bg-white shadow-xl mx-auto rounded-3xl p-10 mt-15 " >
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
         <div className="bg-white shadow-xl mx-auto rounded-3xl p-10 m-4" >
           <p className="mt-10 text-xl text-gray-800 leading-relaxed whitespace-pre-line">{content}</p>
        </div>
       </div>
        </div>
        </>
    )
}