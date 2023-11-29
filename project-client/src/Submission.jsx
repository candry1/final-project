import { useEffect, useState } from "react";
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
    setSubmissionInfo({
      ...submissionInfo,
      destination: newDestination,
    });
  };

  const handleInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === 'numOfTravelers' && value === '0') {
      // Alert and prevent further action if the number of travelers is 0
      alert('Number of travelers cannot be 0.');
      return;
    }
  
    // if (value.trim() === '') {
    //   // Alert and prevent further action if the input is empty
    //   alert(`${name} cannot be empty.`);
    //   return;
    // }

    setSubmissionInfo({
      ...submissionInfo,
      [event.target.name]: value,
    });
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const getMinReturnDate = () => {
    // Calculate the minimum return date to be 1 day after the check-in date
    const minReturnDate = new Date(submissionInfo.checkInDate);
    minReturnDate.setDate(minReturnDate.getDate() + 1);

    // Format the date as "YYYY-MM-DD" for the input
    const year = minReturnDate.getFullYear();
    let month = minReturnDate.getMonth() + 1;
    let day = minReturnDate.getDate() + 1;

    // Add leading zero if month or day is a single digit
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
    
  };

  // const submitForm = (event) => {
    
  //   event.preventDefault();
  //   const form = event.target;
  //   if (!form.checkValidity()) {
  //     alert('Please fill out all required fields.')
  //     return;
  //   }
  //   setOnSubmit(true);
  //   navigate("/vacation-planner");
  // };

  useEffect(() => {
    if (onSubmit) {
      // Navigate to /vacation-planner when onSubmit is true
      navigate("/vacation-planner");
    }
  }, [onSubmit, navigate]);

  const submitForm = (event) => {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      alert('Please fill out all required fields.')
      return;
    }
    setOnSubmit(true);
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
            type="text"
            pattern="[0-9]*"
            min="1"
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
            min={getCurrentDate()}
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
            min={getMinReturnDate()} 
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
            type="text"
            value={submissionInfo.numOfTravelers}
            onChange={handleInput}
            pattern="[0-9]*"
            inputMode="numeric"
            title="Please enter a valid number"
            min="1"  // Minimum value of 1
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
