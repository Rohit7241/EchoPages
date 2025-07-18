import BlogPage from "./pages/blog"
import Home from "./pages/home"
import BlogCard from "./components/blogcard"
function App() {
   let title="Google Search: Introducing AI Mode in India"
    let content=`Imagine being able to ask whatever's on your mind, even a question that's very complex or multi-layered, and in an instant, receiving a comprehensive, AI-powered response that unpacks the topic using advanced reasoning, complete with essential details and links to explore. Now, you can experience this firsthand with AI Mode, our most powerful AI search experience yet.

We first introduced AI Mode as an experiment in the U.S. earlier this year, and started rolling out to users outside of Labs at Google I/O 2025. It's already resonating with users who appreciate its speed, quality, and fresh responses. Following this positive feedback, we’re excited to bring AI Mode to India, starting today, as an experiment in Labs in English. This approach allows us to learn what’s most helpful to our users here and improve rapidly with your feedback.

Built for your most complex questions
AI Mode is our most powerful AI search, with more advanced reasoning and multimodality, and the ability to go deeper through follow-up questions and helpful links to the web. Using a custom version of Gemini 2.5, it lets you ask longer, more complex or nuanced questions that would have previously required multiple searches. In fact, early testers of AI Mode are asking much longer queries - 2-3x the length of traditional searches - showing that people are already using it for their toughest questions. It’s particularly helpful for exploratory questions and for more complicated tasks like comparing products, planning a trip, or understanding complex how-tos.

For example, you could ask: "My kids are 4 and 7 and have lots of energy. Suggest creative ways to get them active and moving indoors, especially on hot days, without needing a lot of space or expensive toys.”

Behind the scenes, AI Mode uses our query fan-out technique. It breaks your question into subtopics and issues a multitude of queries simultaneously on your behalf, enabling Search to dive deeper into the web than ever before. This helps you discover even more of what the web has to offer and find incredible, hyper-relevant content that matches your question. You can also easily ask follow-ups like, "Can you suggest some activities that they can do independently" to dig even deeper.`
    return(
          <>
          {/* <Home/> */}
          <BlogPage title={title} content={content}/>
          </>
    )  
}

export default App
