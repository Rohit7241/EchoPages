import logo from "../assets/logo.webp"
import { useState } from "react"
import Sidepanel from "./sidepanel"
import {
  Link,
} from "react-router-dom";
import React from "react";
function NavBar({underline,log}){
    const [isopen,setisopen]=useState(false)
    function open(){
        isopen?setisopen(false):setisopen(true)
    }
    return(
        <>
        <nav className={`fixed top-0 h-15 w-full bg-indigo-300 flex items-center justify-between z-40`}>
            <div className="text-3xl pt-3 ml-5 flex">
                <img  className="h-10 w-10 mr-3 mb-2" src={logo} alt="EchoPages logo" />
                <a href="/" className="text-slate-600" >EchoPages</a>
            </div>
            {log=="true"&&<Sidepanel isopen={isopen} log={log} open={open} underline={underline}/>}
        </nav>
        </>
    )
}

export default NavBar