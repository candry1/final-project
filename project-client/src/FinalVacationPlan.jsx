import React from "react";
import PropTypes from "prop-types";
import airlineCodeToName from './airlineCodes';

const FinalVacationPlan = ({ selectedHotel, selectedFlight, submissionInfo, selectedHotelInfo, selectedFlightInfo }) => {
  console.log('selectedFlightInfo: ', selectedFlightInfo);
  console.log('selectedFlight: ', selectedFlight);
  console.log('selectedHotel: ', selectedHotel);
  function formatDuration(isoDuration) {
    const durationRegex = /PT(\d+H)?(\d+M)?/;
    const matches = isoDuration.match(durationRegex);
  
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
  
    const formattedDuration = [];
    if (hours > 0) {
      formattedDuration.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
    }
    if (minutes > 0) {
      formattedDuration.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
    }
  
    return formattedDuration.join(' and ');
  }
  const {
    id,
    itineraries,
    price,
    numberOfBookableSeats,
    travelerPricings,
  } = selectedFlightInfo;
  const firstItinerary = selectedFlightInfo.itineraries[0];
  const firstSegment = firstItinerary.segments[0];
  const airlineCode = firstSegment?.carrierCode;
  const airlineName = airlineCodeToName[airlineCode] || airlineCode;
  const departureAirportCode = firstSegment?.departure.iataCode;
  const departureDateTime = firstSegment?.departure.at;
  const arrivalAirportCode = firstSegment?.arrival.iataCode;
  const arrivalDateTime = firstSegment?.arrival.at;
  const flightDuration = itineraries[0]?.duration;
  const readableDuration =  formatDuration(flightDuration);
  const numberOfStops = firstSegment?.numberOfStops;
  const cabin = travelerPricings[0]?.fareDetailsBySegment[0]?.cabin;
  const includedCheckedBags = travelerPricings[0]?.fareDetailsBySegment[0]?.includedCheckedBags.quantity;
  const formattedDepartureDateTime = new Date(departureDateTime).toLocaleString();
  const formattedArrivalDateTime = new Date(arrivalDateTime).toLocaleString()
  return (
    <div>
      <h2>Your Final Vacation Plan</h2>
      <h3>Hotel Information</h3>
      <p>Name: {selectedHotelInfo.hotel.name}</p>
      <p>Check-In Date: {selectedHotelInfo.offers.at(0).checkInDate}</p>
      <p>Check-Out Date: {selectedHotelInfo.offers.at(0).checkOutDate}</p>
      <p>Total Price: ${selectedHotelInfo.offers.at(0).price.total}</p>
      
      <h3>Flight Information</h3>
      <p>Airline: {airlineName}</p>
      <p>Departure Date: {firstSegment.departure.at}</p>
      <p>Departure Airport: {departureAirportCode}</p>
      <p>Departure Date and Time: {formattedDepartureDateTime}</p>
      <p>Price: {price?.total} {price?.currency}</p>
      {/* <p>Return Date: {selectedFlight.returnDate}</p>
      <p>Total Price: ${selectedFlight.price.toFixed(2)}</p> */}
      {/* Add more flight information as needed */}

      <h3>General Information</h3>
      <p>Origin: {submissionInfo.origin}</p>
      <p>Destination: {submissionInfo.destination}</p>
      <p>Trip Budget: ${submissionInfo.budget.toFixed(2)}</p>
      <p>Number of Travelers: {submissionInfo.numOfTravelers}</p>

      {/* Add more general information as needed */}
    </div>
  );
};

FinalVacationPlan.propTypes = {
  // selectedHotel: PropTypes.object.isRequired,
  // selectedFlight: PropTypes.object.isRequired,
  submissionInfo: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    checkInDate: PropTypes.string.isRequired,
    checkOutDate: PropTypes.string.isRequired,
    numOfTravelers: PropTypes.number.isRequired,
  }).isRequired,
};

export default FinalVacationPlan;
