import React from "react";
import {Hotels} from './Hotels.jsx'

const VacationPlanner = ({ submissionInfo }) => {
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
      <Hotels submissionInfo={submissionInfo}/>
      </div>
    </div>
  );
};

export default VacationPlanner;
