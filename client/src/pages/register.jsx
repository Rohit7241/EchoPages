import NavBar from "../components/navbar";
import { Link } from "react-router-dom";
import image from "../assets/image.webp"
import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
export default function RegisterUser(){
  
  const navigate = useNavigate();
  const [username,setusername]=useState("")
  const [name,setname]=useState("")
  const [showpassword,setshow]=useState("")
  const [wrong,setwrong]=useState(false);
  const [error,seterror]=useState("");
  const [email,setemail]=useState("")
  const [password,setpass]=useState("")
  const [Profile,setProfile]=useState(undefined)
  const [Cover,setcover]=useState(undefined)
  const registeruser=async()=>{
    try {
          const formData = new FormData();
            formData.append("name", name);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("ProfilePic", Profile);
            formData.append("coverImage", Cover);
       const res=await axios.post("http://localhost:8000/api/v1/users/register",formData)
    navigate("/login")
    } catch (error) {
     const html = error.response.data;
     const match = html.match(/<pre>Error: (.*?)<br>/);
     setwrong(true)
    match[1]?seterror(match[1]):seterror("error while registering")
    }
  }

  const handleProfile=(e)=>{
   const file=e.target.files[0];
   console.log(e.target.files[0])
   setProfile(file);
  }
  const handleCover=(e)=>{
   const file=e.target.files[0];
   console.log(e.target);
   setcover(file);
   console.log(Profile)
   console.log(Cover)
  }
      return(
        <>
        <NavBar log="false"/>
        <div className={`h-screen w-screen flex justify-center items-center`}   style={{backgroundImage: `url(${image})`}}  >
            <div className="max-h-md rounded-3xl max-w-md h-auto mt-15 p-5 bg-white/50 flex-col flex  items-center w-full">
              <h1 className="text-4xl font-semibold text-gray-600">Register</h1>
              <form className="mt-5  flex-col  items-center" onSubmit={registeruser}>
              {wrong&&<h1 className="h-auto rounded p-2 bg-white/60 font-semibold text-red-500">** {error} **</h1>}

                <h1 className="font-semibold text-gray-600 text-lg">Full Name:</h1>
                <input  className="rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" onChange={(e)=>setname(e.target.value)} name="fullname" id=""value={name}/>

                <h1 className="font-semibold text-gray-600 text-lg">UserName</h1>
                <input  className="rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" placeholder="Unique Username"  onChange={(e)=>setusername(e.target.value)} name="username" id=""value={username}/>
                 
                <h1 className="mt-3 font-semibold text-gray-600 text-lg">Email :</h1>
                <input placeholder="example@gmail.com" className=" rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" onChange={(e)=>setemail(e.target.value)} name="email" id="" value={email}/>

                <h1 className="mt-3 font-semibold text-gray-600 text-lg">Password :</h1>
                <input autoComplete="off" type={showpassword?"text":"password"} className="rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" onChange={(e)=>setpass(e.target.value)} name="password" id="" value={password}/>
                <button type="button"  onClick={()=>{setshow(!showpassword)}} className="bg-gray-300 mt-2 px-3 py-2 rounded text-sm">{showpassword ? "Hide" : "Show"} Password</button>

                <h1 className="mt-3 font-semibold text-gray-600 text-lg">Profile Photo :</h1>
                <input  type="file" accept="image/*" className="rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" onChange={handleProfile} name="email" id="" />

                <h1 className="mt-3 font-semibold text-gray-600 text-lg">Cover Photo :</h1>
                <input  type="file" accept="image/*" className="rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" onChange={handleCover} name="email" id="" />
             
              </form>
              <input
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      registeruser(); // Call the same function as the button
                    }
                  }}
                />
               <button className="h-10 text-lg  w-25 rounded-xl mt-10 hover:bg-red-400 items-center bg-red-300" onClick={registeruser}>Register</button>
               <h1 className="mt-3">Already Registered? <Link className="text-blue-900" to="/login">Login</Link></h1>
            </div>
        </div>
        </>
        
    )
}