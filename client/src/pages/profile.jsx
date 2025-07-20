import NavBar from "../components/navbar";
import image from "../assets/profileimage.webp";
import BlogCard from "../components/blogcard";

export default function ProfilePage({user}) {
  const name = "ALEX STONE";
  const blogs = 10;
  const about = "this is my about section";
  const title = "Google hired me";
  const content =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis adipisci enim ea quae, delectus quam, neque cum excepturi reprehenderit voluptatem sequi libero blanditiis quasi animi, repudiandae expedita modi similique. Excepturi.";

  return (
    <>
      <div className="w-full flex flex-col">
        <NavBar />

        {/* Profile Section */}
        <div className="flex shadow-xl flex-col md:flex-row items-center bg-violet-300 rounded-3xl m-6 mt-30 w-auto p-6 gap-6">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-center bg-cover"
            style={{ backgroundImage: `url(${image})` }}
          ></div>

          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="mt-3 text-xl text-gray-800">{about}</p>
            <p className="mt-3 text-xl text-gray-800">{blogs} blog contributions</p>
            {user=="true"&&<div className="flex">
            <button className="h-10 w-auto p-2 mt-5 text-white bg-indigo-400 hover:bg-indigo-500 rounded-xl">Create New Blog</button>
             <button className="h-10 ml-10 w-auto p-2 mt-5 bg-rose-200 hover:bg-rose-300 rounded-xl">Delete Account</button>
            </div>}

          </div>
        </div>

        {/* Blog Section */}
        <div className="flex flex-col mt-10 gap-6 flex items-center px-6 pb-10">
            <h1 className="text-4xl font-semibold">BLOGS</h1>
          {[...Array(8)].map((_, i) => (
            <BlogCard key={i} title={title} content={content} user={user}/>
          ))}
        </div>
      </div>
    </>
  );
}
