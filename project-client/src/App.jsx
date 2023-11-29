import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SubmissionForm from "./Submission";
import VacationPlanner from "./VacationPlanner";
import { useState } from "react";

function App() {
  const [onSubmit,setOnSubmit ] = useState(false);
  const [submissionInfo, setSubmissionInfo] = useState({
    origin: "",
    destination: "",
    budget: 1000,
    checkInDate: "",
    checkOutDate: "",
    numOfTravelers: 1,
  });

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <SubmissionForm
                  submissionInfo={submissionInfo}
                  setSubmissionInfo={setSubmissionInfo}
                  onSubmit={onSubmit}
                  setOnSubmit={setOnSubmit}
                />
              }
            />
            <Route
              path="/vacation-planner"
              element={
                <VacationPlanner
                  submissionInfo={submissionInfo}
                  setSubmissionInfo={setSubmissionInfo}
                  onSubmit={onSubmit}
                  setOnSubmit={setOnSubmit}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
