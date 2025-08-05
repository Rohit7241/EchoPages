export default function Comment({content,user}){
    return(
        <>
        <div className="w-auto h-auto m-3 bg-blue-100 p-5 rounded-md">
          <h1 className="font-bold">{user}</h1>
          <p>{content}</p>
        </div>
        </>
    )
}