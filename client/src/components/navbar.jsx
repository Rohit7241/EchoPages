import logo from "../assets/logo.webp"
import { useState } from "react"
import Sidepanel from "./sidepanel"
function NavBar(){
    const [isopen,setisopen]=useState(false)
    const [slider,setslider]=useState(false)
    function open(){
        isopen?setisopen(false):setisopen(true)
        console.log(isopen)
    }
    return(
        <>
        <nav className={`h-15 bg-indigo-300 flex items-center justify-between`}>
            <div className="text-3xl pt-3 ml-5 flex">
                <img  className="h-10 w-10 mr-3" src={logo} alt="EchoPages logo" />
                <a href="/" className="text-slate-600" >EchoPages</a>
            </div>
            <Sidepanel isopen={isopen} open={open}/>
            
        </nav>
        </>
    )
}

export default NavBar