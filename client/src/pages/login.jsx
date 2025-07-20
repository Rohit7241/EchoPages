import NavBar from "../components/navbar";
import image from "../assets/image.webp"
import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
export default function LoginPage(){
  
  const navigate = useNavigate();
  const [username,setusername]=useState("")
  const [wrong,setwrong]=useState(false);
  const [error,seterror]=useState("");
  const [email,setemail]=useState("")
  const [password,setpass]=useState("")
  const loginuser=async()=>{
    try {
       const res=await axios.post("http://localhost:8000/api/v1/users/login", {
      username: username,
      email: email,
      password: password
    })
    navigate("/home")
    } catch (error) {
     const html = error.response.data;
     const match = html.match(/<pre>Error: (.*?)<br>/);
     setwrong(true)
     seterror(match[1])
    }
    
  }
    return(
        <>
        <NavBar/>
        <div className={`h-screen w-screen flex justify-center items-center`}   style={{backgroundImage: `url(${image})`}}  >
            <div className="max-h-md rounded-3xl max-w-md h-110 p-8 bg-white/50 flex-col flex  items-center w-full">
              <h1 className="text-4xl font-semibold text-gray-600">Login</h1>
              <form className="mt-5  flex-col  items-center" onSubmit={loginuser}>
              {wrong&&<h1 className="h-auto rounded p-2 bg-white/60 font-semibold text-red-500">** {error} **</h1>}
                <h1 className="font-semibold text-gray-600 text-lg">UserName :</h1>
                <input  className="rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" onChange={(e)=>setusername(e.target.value)} name="username" id=""value={username}/>
                 
                <h1 className="mt-3 font-semibold text-gray-600 text-lg">Email :</h1>
                <input placeholder="example@gmail.com" className=" rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" onChange={(e)=>setemail(e.target.value)} name="email" id="" value={email}/>
                <h1 className="mt-3 font-semibold text-gray-600 text-lg">Password :</h1>
                <input type="password" className="rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" onChange={(e)=>setpass(e.target.value)} name="password" id="" value={password}/>
              </form>
               <button className="h-10 text-lg  w-25 rounded-xl mt-10 hover:bg-red-400 items-center bg-red-300" onClick={loginuser}>Submit</button>
            </div>
        </div>
        </>
        
    )
}