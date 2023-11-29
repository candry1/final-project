import { Hotels } from "./Hotels.jsx";
import "./VacationPlanner.css";
import { Flights } from "./Flights.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useNavigate } from "react-router-dom";

const VacationPlanner = ({ submissionInfo, onSubmit, selectedHotel, setSelectedHotel, selectedFlight, setSelectedFlight, selectedHotelInfo, setSelectedHotelInfo,
  selectedFlightInfo, setSelectedFlightInfo}) => {
  // const [selectedHotel, setSelectedHotel] = useState(0);
  // const [selectedFlight, setSelectedFlight] = useState(0);
  const [selectedFlightPrice, setSelectedFlightPrice] = useState(0);
  const [onChooseHotel,setOnChooseHotel ] = useState(false);
  const [onChooseFlight,setOnChooseFlight ] = useState(false);
  const isButtonVisible = onChooseHotel && onChooseFlight;

  const navigate = useNavigate();

  const handleButtonClick = () => {
    //  pass data to the next page using the state object
    navigate("/final-vacation-plan", { state: { selectedHotel, selectedFlight, submissionInfo } });
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
        selectedHotelInfo={selectedHotelInfo}
        setSelectedHotelInfo={setSelectedHotelInfo}
        />
        <Flights submissionInfo={submissionInfo} 
        onSubmit={onSubmit} selectedHotel={selectedHotel} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight}
        onChooseHotel={onChooseHotel} setOnChooseFlight={setOnChooseFlight} setSelectedFlightPrice={setSelectedFlightPrice} 
        selectedFlightPrice={selectedFlightPrice} selectedFlightInfo={selectedFlightInfo} setSelectedFlightInfo={setSelectedFlightInfo} />
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
