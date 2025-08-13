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
  const loginuser = async (e) => {
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
        <NavBar log="false" />
<div
  className="min-h-screen w-screen flex justify-center items-center bg-cover bg-center"
  style={{ backgroundImage: `url(${image})` }}
>
  <div className="rounded-3xl w-[90%] max-w-md p-6 sm:p-8 bg-white/50 flex flex-col items-center">
    <h1 className="text-3xl sm:text-4xl font-semibold text-gray-600">Login</h1>

    <form
      className="mt-5 flex flex-col gap-4 w-full"
    >
      {wrong && (
        <h1 className="rounded p-2 bg-white/60 font-semibold text-red-500 text-center">
          ** {error} **
        </h1>
      )}

      <div>
        <label className="font-semibold text-gray-600 text-lg">Username :</label>
        <input
          className="rounded-xl text-gray-700 text-lg bg-white pt-1 pl-5 h-10 w-full"
          onChange={(e) => setusername(e.target.value)}
          name="username"
          value={username}
        />
      </div>

      <div>
        <label className="font-semibold text-gray-600 text-lg">Email :</label>
        <input
          placeholder="example@gmail.com"
          className="rounded-xl text-gray-700 text-lg bg-white pt-1 pl-5 h-10 w-full"
          onChange={(e) => setemail(e.target.value)}
          name="email"
          value={email}
        />
      </div>

      <div>
        <label className="font-semibold text-gray-600 text-lg">Password :</label>
        <input
          type={showpassword ? "text" : "password"}
          className="rounded-xl text-gray-700 text-lg bg-white pt-1 pl-5 h-10 w-full"
          onChange={(e) => setpass(e.target.value)}
          name="password"
          value={password}
        />
        <button
          type="button"
          onClick={() => setshow(!showpassword)}
          className="bg-gray-300 mt-2 px-3 py-2 rounded text-sm"
        >
          {showpassword ? "Hide" : "Show"} Password
        </button>
      </div>
    </form>
    <button
        className="h-10 text-lg w-full rounded-xl mt-4 hover:bg-red-400 bg-red-300"
        onClick={loginuser}
      >
        Submit
      </button>
    <h1 className="mt-5 text-base sm:text-xl">
      New User?{" "}
      <Link className="text-blue-900" to="/register">
        Register
      </Link>
    </h1>
  </div>
</div>

        </>
        
    )
}