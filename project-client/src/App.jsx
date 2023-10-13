import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./NavBar";
import Home from "./Home";
import SubmissionForm from "./Submission";

function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState(0);
  const [groupSize, setGroupSize] = useState(0);
  const [travelDates, setTravelDates] = useState("");

  return (
    <>
      <div className="App">
        {/* <BrowserRouter> */}
          <Navbar />
          <Home />
          <SubmissionForm />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        {/* </BrowserRouter> */}
      </div>
    </>
  )
}

export default App
