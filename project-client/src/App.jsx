import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SubmissionForm from "./Submission";
import VacationPlanner from "./VacationPlanner";
import FinalVacationPlan from "./FinalVacationPlan";
import { useState } from "react";
import Navbar from "./Navbar";

function App() {
  const [onSubmit,setOnSubmit ] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotelInfo, setSelectedHotelInfo] = useState({});
  const [selectedFlightInfo, setSelectedFlightInfo] = useState({});
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
        <Navbar /> 
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
                  selectedHotel={selectedHotel}
                  setSelectedHotel={setSelectedHotel}
                  selectedFlight={selectedFlight}
                  setSelectedFlight={setSelectedFlight}
                  setOnSubmit={setOnSubmit}
                  selectedHotelInfo={selectedHotelInfo}
                  setSelectedHotelInfo={setSelectedHotelInfo}
                  selectedFlightInfo={selectedFlightInfo}
                  setSelectedFlightInfo={setSelectedFlightInfo}
                />
              }
            />
            <Route
              path="/final-vacation-plan"
              element={
                <FinalVacationPlan
                  submissionInfo={submissionInfo}
                  selectedHotel={selectedHotel}
                  selectedFlight={selectedFlight}
                  selectedHotelInfo={selectedHotelInfo}
                  selectedFlightInfo={selectedFlightInfo}
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
