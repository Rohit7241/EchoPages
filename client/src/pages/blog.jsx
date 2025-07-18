import NavBar from "../components/navbar"

export default function BlogPage({title,content}){
    
    return (
        <>
        <div className="min-h-screen w-full bg-sky-200">
            <NavBar/>
       <div className="flex justify-center p-6 pt-24">
         <div className="bg-white shadow-xl rounded-3xl p-10 m-10" >
           <h1 className="text-4xl font-bold">{title}</h1>
           <p className="mt-10 text-xl text-gray-800 leading-relaxed whitespace-pre-line">{content}</p>
        </div>
       </div>
        </div>
        </>
    )
}