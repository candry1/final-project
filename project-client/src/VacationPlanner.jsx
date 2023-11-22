import { Hotels } from "./Hotels.jsx";
import { Flights } from "./Flights.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const VacationPlanner = ({ submissionInfo, onSubmit}) => {

  return (
    <div>
      <h2>Vacation Planner</h2>
      <p>Origin: {submissionInfo.origin}</p>
      <p>Destination: {submissionInfo.destination}</p>
      <p>Trip Budget: {submissionInfo.budget}</p>
      <p>Check-In Date: {submissionInfo.checkInDate}</p>
      <p>Check-Out Date: {submissionInfo.checkOutDate}</p>
      <p>Number of Travelers: {submissionInfo.numOfTravelers}</p>
      <div>
        <Hotels submissionInfo={submissionInfo} onSubmit={onSubmit}/>
        <Flights submissionInfo={submissionInfo} onSubmit={onSubmit} />
      </div>
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
