// import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import SubmissionForm from "./components/Submission";
import { useState } from "react";

function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState(0);
  const [groupSize, setGroupSize] = useState(0);
  const [travelDates, setTravelDates] = useState("");

  return (
    <div className="App">
      {/* <BrowserRouter> */}
        <Navbar />
        <Home />
        <SubmissionForm />
        {/* <Routes>
          <Route path="/" element={<Home />} />
        </Routes> */}
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
