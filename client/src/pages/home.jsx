import NavBar from "../components/navbar"
import BlogCard from "../components/blogcard"
import { useEffect, useState } from "react"
import axios from "axios"
export default function Home(){
    const [blogs,setblogs]=useState([])
    useEffect(()=>{
            const getallblogs=async()=>{
            try {
                const res=await axios.get("http://localhost:8000/api/v1/blog/getallblogs",
                    {withCredentials:true}
                )
                setblogs(res.data.data)
            
            } catch (error) {
                console.log(error);
            }
    }
    getallblogs();
    },[])
    blogs.map((blog)=>{
    console.log(blog.content)
    })
    let title="Google Search: Introducing AI Mode in India"
    let content="We first introduced AI Mode as an experiment in the U.S. earlier this year, and started rolling out to users outside of Labs at Google I/O 2025. It's already resonating …"
    return (
        <>
        
           <NavBar underline="home" log="true"/>
            <main className="flex-1 pt-20 h-full bg-white-500 p-6">
                {blogs.map((blog)=>
                  <BlogCard id={blog._id} title={blog.title.slice(0,100)} content={blog.content.slice(0,650)}/>
                )}
            </main>
        </>
    )
}