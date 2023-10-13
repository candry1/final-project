import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from "./NavBar";
import Home from "./Home";
import SubmissionForm from "./Submission";

function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Home />
          <SubmissionForm />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
