import NavBar from "../components/navbar";
import BlogCard from "../components/blogcard";
import axios from "axios";
import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";

export default function ProfilePage({user,underline}) {
    const [username,setusername]=useState("")
    const [name,setname]=useState("")    
    const[newpro,setnewpro]=useState("")
    const [Profile,setProfile]=useState(undefined)
    const [Cover,setcover]=useState(undefined)
    const [show,setshow]=useState(false)
     const [loader,setloader]=useState(false)
     const [blogData, setBlogData] = useState([]);
    useEffect(() => {
      const getuser = async () => {
        try {
          const data = await axios.get("https://echopages3.onrender.com/api/v1/users/getuser", {
            withCredentials: true
          })
          let res = data.data.data;
          setProfile(res.profilePic);
          const blogresults = await Promise.all(
            res.blogs.map(async (b) => {
              try {
                setloader(true)
                const res = await axios.get(
                  `https://echopages3.onrender.com/api/v1/blog/${b}/getblog`,
                  { withCredentials: true }
                );
                setloader(false)
                return {
                  title: res.data.data.title,
                  content: res.data.data.content,
                  id:res.data.data._id
                };
                
              } catch (error) {
                console.log(error);
                return null; // handle individual request failure
              }
            })
           
          );
          setBlogData(blogresults)
          setcover(res.coverImage);
          setname(res.name);
          setusername(res.username);
        } catch (error) {
          console.log(error);
        }
      };

      getuser();
    }, []);
   const handleProfile=async (e)=>{
   const file=e.target.files[0];
   setnewpro(file);
  }
    const updateProfile=async ()=>{
       try {
         const formData = new FormData();
         formData.append("ProfilePic",newpro);
        const res=await axios.post("http://localhost:8000/api/v1/users/updateProfile",
         formData,
         {withCredentials:true}
        )
        setProfile(res.data.data);
        
       } catch (error) {
        console.log(error)
       }
       setshow(false)
    }
    
    
  return (
    <>
      <div className="w-full flex flex-col">
       {user&&<NavBar underline="mypro" log="true"/>}
        {!user&&<NavBar log="true" />}

        {/* Profile Section */}
        <div className="min-h-50 mt-15 bg-white w-full " style={{backgroundImage:`url(${Cover})`}}></div>
        <div className="flex shadow-xl flex-col md:flex-row items-center bg-violet-300 mb-6 w-auto p-6 pl-15 gap-6">
          <div onClick={()=>setshow(true)} className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-center bg-cover"
            style={{ backgroundImage: `url(${Profile})` }}
          ></div>
         { show&&<div className="fixed bg-white border-black border-1 p-5 z-999">
            <h3 className="text-xl mb-5">Update Profile Picture</h3>
            <input type="file" accept="image/*" onChange={handleProfile} />
            <div className="flex justify-between">
              <p className="underline text-blue-500 mt-5 cursor-pointer" onClick={updateProfile}>Submit</p>
            <p className="underline text-red-500 mt-5 cursor-pointer" onClick={()=>setshow(false)}>Cancel</p>
            </div>
          </div>
          }
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="mt-3 text-xl text-gray-800">@{username}</p>
            <p className="mt-3 text-xl text-gray-800">{blogData.length} blog contributions</p>
            {user=="true"&&<div className="flex">
            <Link to="/createblog" className="h-10 w-auto p-2 mt-5 text-white bg-indigo-400 hover:bg-indigo-500 rounded-xl" >Create New Blog</Link>
             <button className="h-10 ml-10 w-auto p-2 mt-5 bg-rose-200 hover:bg-rose-300 rounded-xl">Delete Account</button>
            </div>}

          </div>
        </div>

        <div className="flex flex-col mt-10 gap-6 flex items-center px-6 pb-10">
            <h1 className="text-4xl font-semibold">BLOGS</h1>
          {blogData.map((i) => (
            <BlogCard title={i.title.slice(0,100)} content={`${i.content.slice(0,650)}......`} user={true} id={i.id} />
          ))}
        </div>
      </div>
    </>
  );
}
