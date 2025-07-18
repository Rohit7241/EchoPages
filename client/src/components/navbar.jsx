import logo from "../assets/logo.webp"
import { useState } from "react"
import Sidepanel from "./sidepanel"
function NavBar(){
    const [isopen,setisopen]=useState(false)
    function open(){
        isopen?setisopen(false):setisopen(true)
    }
    return(
        <>
        <nav className={`fixed h-15 w-full bg-indigo-300 flex items-center justify-between z-40`}>
            <div className="text-3xl pt-3 ml-5 flex">
                <img  className="h-10 w-10 mr-3 mb-2" src={logo} alt="EchoPages logo" />
                <a href="/" className="text-slate-600" >EchoPages</a>
            </div>
            
            <Sidepanel isopen={isopen} open={open}/>
            
        </nav>
        </>
    )
}

export default NavBar