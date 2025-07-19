import NavBar from "../components/navbar";
import image from "../assets/image.webp"
export default function LoginPage(){
    return(
        <>
        <NavBar/>
        <div className={`h-screen w-screen flex justify-center items-center`}   style={{backgroundImage: `url(${image})`}}  >
            
            <div className="max-h-md rounded-3xl max-w-md h-110 p-8 bg-white/50 flex-col flex  items-center w-full">
              <h1 className="text-4xl font-semibold text-gray-600">Login</h1>
              <form className="mt-5  flex-col  items-center" action="">
                <h1 className="font-semibold text-gray-600 text-lg">UserName :</h1>
                <input  className="rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" name="username" id=""></input>
                <h1 className="mt-3 font-semibold text-gray-600 text-lg">Email :</h1>
                <input placeholder="example@gmail.com" className=" rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" name="email" id=""></input>
                <h1 className="mt-3 font-semibold text-gray-600 text-lg">Password :</h1>
                <input type="password" className="rounded-xl flex text-gray-700 text-lg resize-none bg-white pt-1 pl-5 h-10 w-100" name="password" id=""></input>
              </form>
               <button className="h-10 text-lg  w-25 rounded-xl mt-10 hover:bg-red-400 items-center bg-red-300">Submit</button>
            </div>
        </div>
        </>
        
    )
}