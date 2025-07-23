import NavBar from "../components/navbar"
import BlogCard from "../components/blogcard"
export default function Home(){
    let title="Google Search: Introducing AI Mode in India"
    let content="We first introduced AI Mode as an experiment in the U.S. earlier this year, and started rolling out to users outside of Labs at Google I/O 2025. It's already resonating …"
    return (
        <>
        
           <NavBar underline="home" log="true"/>
            <main className="flex-1 pt-20 h-full bg-white-500 p-6">
                <BlogCard title={title} content={content}/>
                <BlogCard title={title} content={content}/>
                <BlogCard title={title} content={content}/>
                <BlogCard title={title} content={content}/>
                <BlogCard title={title} content={content}/>
                <BlogCard title={title} content={content}/>
                <BlogCard title={title} content={content}/>
                <BlogCard title={title} content={content}/>
            </main>
        </>
    )
}