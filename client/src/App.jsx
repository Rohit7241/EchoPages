import NavBar from "./components/navbar"
import bgimage from "../src/assets/download.jpg"

function App() {
    return(
          <>
          <NavBar/>
          <div >
            <img src={bgimage} alt="" className="w-full" />
          </div>
          </>
    )  
}

export default App
