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
    budget: 0,
    checkInDate: "",
    checkOutDate: "",
    numOfTravelers: 0,
  });

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <SubmissionForm
            submissionInfo={submissionInfo}
            setSubmissionInfo={setSubmissionInfo}
            onSubmit={onSubmit}
            setOnSubmit={setOnSubmit}
          />
          <Routes>
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
