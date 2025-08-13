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
       const res=await axios.post("https://echopages3.onrender.com/api/v1/users/register",formData)
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
       <NavBar log="false" />
<div
  className="min-h-screen flex justify-center items-center px-4 pt-15 bg-cover bg-center"
  style={{ backgroundImage: `url(${image})` }}
>
  <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white/50 flex flex-col items-center">
    <h1 className="text-3xl sm:text-4xl font-semibold text-gray-600">Register</h1>

    <form className="mt-5 w-full space-y-4" onSubmit={registeruser}>
      {wrong && (
        <h1 className="rounded p-2 bg-white/60 font-semibold text-red-500 text-center">
          ** {error} **
        </h1>
      )}

      <div>
        <label className="font-semibold text-gray-600 text-lg">Full Name:</label>
        <input
          className="w-full rounded-xl text-gray-700 text-lg bg-white pt-1 pl-5 h-10"
          onChange={(e) => setname(e.target.value)}
          value={name}
          name="fullname"
        />
      </div>

      <div>
        <label className="font-semibold text-gray-600 text-lg">Username:</label>
        <input
          className="w-full rounded-xl text-gray-700 text-lg bg-white pt-1 pl-5 h-10"
          placeholder="Unique Username"
          onChange={(e) => setusername(e.target.value)}
          value={username}
          name="username"
        />
      </div>

      <div>
        <label className="font-semibold text-gray-600 text-lg">Email:</label>
        <input
          placeholder="example@gmail.com"
          className="w-full rounded-xl text-gray-700 text-lg bg-white pt-1 pl-5 h-10"
          onChange={(e) => setemail(e.target.value)}
          value={email}
          name="email"
        />
      </div>

      <div>
        <label className="font-semibold text-gray-600 text-lg">Password:</label>
        <input
          autoComplete="off"
          type={showpassword ? "text" : "password"}
          className="w-full rounded-xl text-gray-700 text-lg bg-white pt-1 pl-5 h-10"
          onChange={(e) => setpass(e.target.value)}
          value={password}
          name="password"
        />
        <button
          type="button"
          onClick={() => setshow(!showpassword)}
          className="bg-gray-300 mt-2 px-3 py-2 rounded text-sm"
        >
          {showpassword ? "Hide" : "Show"} Password
        </button>
      </div>

      <div>
        <label className="font-semibold text-gray-600 text-lg">Profile Photo:</label>
        <input
          type="file"
          accept="image/*"
          className="w-full rounded-xl text-gray-700 text-lg bg-white pt-1 pl-5 h-10"
          onChange={handleProfile}
        />
      </div>

      <div>
        <label className="font-semibold text-gray-600 text-lg">Cover Photo:</label>
        <input
          type="file"
          accept="image/*"
          className="w-full rounded-xl text-gray-700 text-lg bg-white pt-1 pl-5 h-10"
          onChange={handleCover}
        />
      </div>

      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") registeruser();
        }}
        className="hidden"
      />

      <button
        type="submit"
        className="w-full sm:w-auto h-10 px-6 rounded-xl mt-6 bg-red-300 hover:bg-red-400"
      >
        Register
      </button>
    </form>

    <h1 className="mt-3">
      Already Registered?{" "}
      <Link className="text-blue-900" to="/login">
        Login
      </Link>
    </h1>
  </div>
</div>

        </>
        
    )
}