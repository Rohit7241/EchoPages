import NavBar from "../components/navbar"
import BlogCard from "../components/blogcard"
import { useEffect, useState } from "react"
import axios from "axios"
export default function Home(){
    const [blogs,setblogs]=useState([])
    useEffect(()=>{
            const getallblogs=async()=>{
            try {
                const res=await axios.get("https://echopages3.onrender.com/api/v1/blog/getallblogs",
                    {withCredentials:true}
                )
                setblogs(res.data.data.reverse())
            } catch (error) {
                console.log(error);
            }
    }
    getallblogs();
    },[])
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