import NavBar from "../components/navbar";

export default function CreateBlog() {
  const createblogfunc = (event) => {
    event.preventDefault(); // Fix: Add event as parameter
    console.log("Blog submitted!");
    // Add logic to handle blog creation (e.g., form submission)
  };

  return (
    <>
      <NavBar/>
      <div className="mt-15 bg-blue-200 min-h-screen w-full">
        <form onSubmit={createblogfunc}>
          <div className="flex flex-col">
            <input
              type="text"
              className="text-2xl p-3 rounded w-auto m-10 bg-white"
              placeholder="Title"
              name="title"
              required
            />
            <textarea
              name="content"
              id="content"
              placeholder="Content"
              className="text-xl p-3 rounded w-auto m-10 bg-white resize-none overflow-hidden"
              rows="1"
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-xl p-3 rounded w-auto m-10 bg-violet-500 text-white hover:bg-violet-600"
          >
            Create Blog
          </button>
        </form>
      </div>
    </>
  );
}
