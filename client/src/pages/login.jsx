import NavBar from "../components/navbar";
import image from "../assets/image.webp"
import { useState } from "react";
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"

export default function LoginPage(){
  const [showpassword,setshow]=useState(false);  
  const navigate = useNavigate();
  const [username,setusername]=useState("")
  const [wrong,setwrong]=useState(false);
  const [error,seterror]=useState("");
  const [email,setemail]=useState("")
  const [password,setpass]=useState("")
  const loginuser = async () => {
  try {
    const res = await axios.post(
      "https://echopages3.onrender.com/api/v1/users/login",
      {
        username,
        email,
        password
      },
      { withCredentials: true }
    );
    console.log("Login success:", res.data);
    navigate("/home");

  } catch (error) {
    console.error("Login failed:", error);

    if (error.response && error.response.data) {
      try {
        const html = error.response.data;
        const match = html.match(/<pre>Error: (.*?)<br>/);
        if (match && match[1]) {
          setwrong(true);
          seterror(match[1]);
        } else {
          setwrong(true);
          seterror("Unknown server error");
        }
      } catch (parseErr) {
        setwrong(true);
        seterror("Error parsing server response");
      }
    } else {
      // No response means network or CORS issue
      setwrong(true);
      seterror("Network error — server unreachable");
    }
  }
};

    return(
        <>
        <NavBar log="false"/>
        <div className={`h-screen w-screen flex justify-center items-center`}   style={{backgroundImage: `url(${image})`}}  >
            <div className="max-h-md rounded-3xl max-w-md h-auto p-8 bg-white/50 flex-col flex  items-center w-full">
              <h1 className="text-4xl font-semibold text-gray-600">Login</h1>
              <form className="mt-5  flex-col  items-center" onSubmit={loginuser}>
              {wrong&&<h1 className="h-auto rounded p-2 bg-white/60 font-semibold text-red-500">** {error} **</h1>}
                <h1 className="font-semibold text-gray-600 text-lg">UserName :</h1>
                <input  className="rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" onChange={(e)=>setusername(e.target.value)} name="username" id=""value={username}/>
                <h1 className="mt-3 font-semibold text-gray-600 text-lg">Email :</h1>
                <input placeholder="example@gmail.com" className=" rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" onChange={(e)=>setemail(e.target.value)} name="email" id="" value={email}/>
                <h1 className="mt-3 font-semibold text-gray-600 text-lg">Password :</h1>
                <input type={`${showpassword?"text":"password"}`} className="rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" onChange={(e)=>setpass(e.target.value)} name="password" id="" value={password}/>
                 <button type="button"  onClick={()=>{setshow(!showpassword)}} className="bg-gray-300 mt-2 px-3 py-2 rounded text-sm">{showpassword ? "Hide" : "Show"} Password</button>
              </form>
               <button className="h-10 text-lg  w-25 rounded-xl mt-10 hover:bg-red-400 items-center bg-red-300" onClick={loginuser}>Submit</button>
                 <h1 className="mt-5 text-xl">New User? <Link className="text-blue-900" to="/register">Register</Link></h1>
            </div>
        </div>
        </>
        
    )
}