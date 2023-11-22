import { useState } from "react";
import { Search } from "./Search";
import PropTypes from "prop-types"; // Import PropTypes
import { SearchDestination } from "./SearchDestination";
import "./Submission.css";
import { useNavigate } from "react-router-dom";

function SubmissionForm({ submissionInfo, setSubmissionInfo,onSubmit, setOnSubmit }) {
  const navigate = useNavigate();
  const [cityCode, setCityCode] = useState(null);
  const [destinationCode, setDestinationCode] = useState(null);
  // Callback function to update submissionInfo.origin
  const updateOrigin = (newOrigin) => {
    setSubmissionInfo({
      ...submissionInfo,
      origin: newOrigin,
    });
  };
  const updateDestination = (newDestination) => {
    console.log(submissionInfo);
    setSubmissionInfo({
      ...submissionInfo,
      destination: newDestination,
    });
  };

  const handleInput = (event) => {
    const value = event.target.value;

    setSubmissionInfo({
      ...submissionInfo,
      [event.target.name]: value,
    });
    console.log(submissionInfo);
  };

  const submitForm = (event) => {
    
    event.preventDefault();
    const form = event.target;
    console.log('Form:', form);
    if (!form.checkValidity()) {
      alert('Please fill out all required fields.')
      return;
    }
    setOnSubmit(true);
    navigate("/vacation-planner");
  };

  return (
    <div className="SubmissionForm">
      <h1>Submission Form</h1>
      <form noValidate onSubmit={submitForm}>
        <Search setCityCode={setCityCode} updateOrigin={updateOrigin} />
        <SearchDestination
          setDestinationCode={setDestinationCode}
          updateDestination={updateDestination}
        />
        <br />
        <br />
        <label>
          Trip Budget:
          <input
            name="budget"
            type="number"
            value={submissionInfo.budget}
            onChange={handleInput}
            required
          />
        </label>
        <br />
        <label>
          Departure Date
          <input
            name="checkInDate"
            type="date"
            value={submissionInfo.checkInDate}
            placeholder="MM-DD-YYYY"
            onChange={handleInput}
            required
          />
        </label>
        <label>
          Return Date
          <input
            name="checkOutDate"
            type="date"
            value={submissionInfo.checkOutDate}
            placeholder="MM-DD-YYYY"
            onChange={handleInput}
            required
          />
        </label>
        <br />
        <label>
          Number of travelers:
          <input
            name="numOfTravelers"
            type="number"
            value={submissionInfo.numOfTravelers}
            onChange={handleInput}
            required
          />
        </label>
        <br />
        <button className="submit" >
          Submit
        </button>
      </form>
    </div>
  );
}

SubmissionForm.propTypes = {
  submissionInfo: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    checkInDate: PropTypes.string.isRequired,
    checkOutDate: PropTypes.string.isRequired,
    numOfTravelers: PropTypes.number.isRequired,
  }).isRequired,
  setSubmissionInfo: PropTypes.func.isRequired, 
};


export default SubmissionForm;
