import NavBar from "../components/navbar"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import profile from "../assets/image.avif"
export default function BlogPage(){
  const location = useLocation();
  const { id } = location.state || {}; 
  const [blog,setblog]=useState()
  const [title,settitle]=useState()
  const [userid,setid]=useState()
  const [content,setcontent]=useState()
  const [username,setusername]=useState("")
  const [name,setname]=useState("Deleted user")    
  const[date,setdate]=useState("")
  const [Profile,setProfile]=useState(profile)
    useEffect(()=>{
      const getblog=async ()=>{
       try {
             const res=await axios.get(`http://localhost:8000/api/v1/blog/${id}/getblog`,
                    {withCredentials:true}
                )
                setblog(res.data.data)
                settitle(res.data.data.title);
                setcontent(res.data.data.content);
                 setdate(
                res.data.data.createdAt.slice(0,10)
                )
          try {
              const res2=await axios.get(`http://localhost:8000/api/v1/users/${res.data.data.author}/getuser`,
                {withCredentials:true}
              )  
              let res3=res2.data.data
             
          setname(res3.name);
          setusername(res3.username);
          setProfile(res3.profilePic);
          } catch (error) {
            console.log(error)
          }
      
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
        <div className="h-20 w-20 rounded-full bg-center bg-cover" style={{backgroundImage:`url(${Profile})`}}></div>
        <div>
            <h1 className="ml-5 text-xl">Author Name: {name.toUpperCase()}</h1>
            <h1 className="ml-5 text-sm">Published : {date}</h1>
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