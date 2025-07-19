export default function BlogCard({title,content}){
  return (
    <>
    <a href="">
         <div className="bg-blue-200 shadow-xl h-40 w-full mb-5 rounded-xl p-4 transition-transform duration-300 hover:scale-102 relative z-0">
         <h1 className="font-semibold text-2xl text-slate-600 ml-3">{title}</h1>
         <p className="ml-3 mt-2 text-m text-gray-800 leading-relaxed"> {content}</p>
     </div>
    </a>
    </>
  )
}