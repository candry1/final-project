import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from "./NavBar";
import Home from "./Home";
import SubmissionForm from "./Submission";
import VacationPlanner from "./VacationPlanner";
import { useState, useEffect} from 'react'

function App() {
  const [submissionInfo, setSubmissionInfo] = useState({
    origin: "",
    destination: "",
    budget: 0,
    checkInDate: "",
    checkOutDate: "",
    numOfTravelers: 0
  });

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <SubmissionForm submissionInfo={submissionInfo} setSubmissionInfo={setSubmissionInfo}/>
          <Routes>
            {/* <Route path="/submission-form" element={<SubmissionForm submissionInfo={submissionInfo} setSubmissionInfo={setSubmissionInfo}/>}/> */}
            <Route path="/vacation-planner" element={<VacationPlanner submissionInfo={submissionInfo} setSubmissionInfo={setSubmissionInfo} />} />
          </Routes>
        </BrowserRouter>


      </div>
    </>
  )
}

export default App
