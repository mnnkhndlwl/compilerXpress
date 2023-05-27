import './App.css'
import Navbar from './components/Navbar'
import OnlineIDE from './components/OnlineIDE'
import { useSelector} from "react-redux";

function App() {
  
  const isDarkMode = useSelector((state) => state.darkMode);

  return (
    <>
    <div className={`h-screen w-screen ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <Navbar />
      <OnlineIDE />
    </div>
    </>
  )
}

export default App
