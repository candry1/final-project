import { Hotels } from "./Hotels.jsx";
import "./VacationPlanner.css";
import { Flights } from "./Flights.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const VacationPlanner = ({ submissionInfo, onSubmit}) => {
  const [selectedHotel, setSelectedHotel] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState(0);
  const [selectedFlightPrice, setSelectedFlightPrice] = useState(0);
  const [onChooseHotel,setOnChooseHotel ] = useState(false);
  const [onChooseFlight,setOnChooseFlight ] = useState(false);
  const isButtonVisible = onChooseHotel && onChooseFlight;

  const handleButtonClick = () => {
    // Perform any action when the button is clicked
    // You can call onSubmit or any other function here
    // onSubmit(selectedHotel, selectedFlight);
  };
  return (
    <div>
      <h2>Vacation Planner</h2>
      <p>Origin: {submissionInfo.origin}</p>
      <p>Destination: {submissionInfo.destination}</p>
      <p>Trip Budget: {submissionInfo.budget}</p>
      <p>Check-In Date: {submissionInfo.checkInDate}</p>
      <p>Check-Out Date: {submissionInfo.checkOutDate}</p>
      <p>Number of Travelers: {submissionInfo.numOfTravelers}</p>
      <div className = "hotels">
        <Hotels submissionInfo={submissionInfo} 
        onSubmit={onSubmit} selectedHotel={selectedHotel} 
        setSelectedHotel={setSelectedHotel} 
        selectedFlight={selectedFlight}
        onChooseHotel={onChooseHotel}
        setOnChooseHotel={setOnChooseHotel}
        />
        <Flights submissionInfo={submissionInfo} 
        onSubmit={onSubmit} selectedHotel={selectedHotel} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight}
        onChooseHotel={onChooseHotel} setOnChooseFlight={setOnChooseFlight} setSelectedFlightPrice={setSelectedFlightPrice} selectedFlightPrice={selectedFlightPrice}/>
      </div>
      {isButtonVisible && (
        <div>
          <p>Your budget after hotel and flights is ${((submissionInfo.budget - selectedHotel)- selectedFlightPrice).toFixed(2)}.</p>
          <button onClick={handleButtonClick}>See Vacation Planner</button>
        </div>
      )}
      
    </div>
  );
};
VacationPlanner.propTypes = {
  submissionInfo: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    checkInDate: PropTypes.string.isRequired,
    checkOutDate: PropTypes.string.isRequired,
    numOfTravelers: PropTypes.number.isRequired,
  }).isRequired,
};

export default VacationPlanner;
