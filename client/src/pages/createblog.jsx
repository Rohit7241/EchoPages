import axios from "axios";
import NavBar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useState} from "react";

export default function CreateBlog() {
  const navigate=useNavigate()
  const [title,settitle]=useState("")
  const [content,setcontent]=useState("")
  const createblogfunc = async(event) => {
    event.preventDefault(); 
    try {
      const res=await axios.post("http://localhost:8000/api/v1/blog/Create",{
        title:title,
        content:content
      },{withCredentials:true})
      console.log(res)
      navigate("/myProfile")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <NavBar underline="createblog" log="true"/>
      <div className="mt-15 bg-blue-200 min-h-screen w-full">
        <form onSubmit={createblogfunc}>
          <div className="flex flex-col">
            <input
              type="text"
              className="text-2xl p-3 rounded w-auto m-10 bg-white"
              placeholder="Title"
              name="title"
              onChange={(e)=>settitle(e.target.value)}
              required
            />
            <textarea
              name="content"
              id="content"
              placeholder="Content"
              className="text-xl p-3 rounded w-auto m-10 bg-white resize-none overflow-hidden"
              rows="1"
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              required
              onChange={(e)=>setcontent(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={createblogfunc}
            className="text-xl p-3 rounded w-auto m-10 bg-violet-500 text-white hover:bg-violet-600">
            Create Blog
          </button>
        </form>
      </div>
    </>
  );
}
