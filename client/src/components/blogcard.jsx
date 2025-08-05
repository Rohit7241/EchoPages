import React from "react";
import { Link} from "react-router-dom";

export default function BlogCard({title,content,user,id}){
 
  const deletefunc=function(){
   event.preventDefault();
   console.log("deleted")
  }
  return (
    <>
        <div>
           <div className="bg-blue-200 shadow-xl h-auto w-auto mb-5 rounded-xl p-4 transition-transform duration-300 hover:scale-101 relative z-0">
         <h1 className="font-semibold text-2xl text-slate-800 ml-3">{title}</h1>
         <p className="ml-3 mt-2 text-m text-gray-800 leading-relaxed"> {content}</p>
         <div className="rounded-xl flex flex-row-reverse ">
          <Link to={`/blog`} state={{ id:id }} className="h-auto mt-2 min-w-20 p-2 hover:bg-violet-400 ml-3 bg-gray-300 rounded-xl">Read More</Link>
         {user=="true"&&<button onClick={()=>deletefunc} className="h-auto mt-2 min-w-30 p-2 hover:bg-red-400 bg-gray-300 rounded-xl">Delete blog</button>}
         </div>
     </div>
        </div>
    </>
  )
}