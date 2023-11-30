import React from "react";
import PropTypes from "prop-types";
import airlineCodeToName from './airlineCodes';
import "./FinalVacationPlan.css";
import Events from "./Events"

const FinalVacationPlan = ({ selectedHotel, selectedFlight, submissionInfo, selectedHotelInfo, selectedFlightInfo, 
  vacationButton, setVacationButton, cityName }) => {
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
  let roomType = "";
  let numberOfAdults = "";
  let description = ""; 

  if ( selectedHotelInfo.offers.at(0).price && selectedHotelInfo.offers.at(0).price.variations) {
    roomType = selectedHotelInfo.offers.at(0).room.type;
    numberOfAdults = selectedHotelInfo.offers.at(0).guests.adults;
  }
  if (selectedHotelInfo.offers.at(0).room.description) {
    description = selectedHotelInfo.offers.at(0).room.description.text;
  }
  return (
    <div className="final-vacation-plan-container">
      <h2>Your Final Vacation Plan</h2>

      {/* Hotel Information */}
      <div className="section-container">
        <h3>Hotel Information</h3>
        <p className="info-item">Name: {selectedHotelInfo.hotel.name}</p>
        <p className="info-item">Check-In Date: {selectedHotelInfo.offers.at(0).checkInDate}</p>
        <p className="info-item">Check-Out Date: {selectedHotelInfo.offers.at(0).checkOutDate}</p>
        <p className="info-item">Total Price: ${selectedHotelInfo.offers.at(0).price.total}</p>
        <p className="info-item">Total Price: ${selectedHotelInfo.offers.at(0).price.total}</p>
  
                {selectedHotelInfo.offers.at(0).price && selectedHotelInfo.offers.at(0).price && selectedHotelInfo.offers.at(0).price.variations.average.base ? (
                  <p>Price Per Night: ${selectedHotelInfo.offers.at(0).price.variations.average.base}</p>
                ) : (
                  <p>Price Per Night: N/A</p>
                )}
                {selectedHotelInfo && selectedHotelInfo.offers.at(0).room.description ? (
                  <p>Room Description: {description}</p>
                ) : (
                  <p>Room Description: N/A</p>
                )}
                <p>Room Type: {roomType}</p>
                <p>Number of Adults: {numberOfAdults}</p>
      </div>

      {/* Flight Information */}
      <div className="section-container">
        <h3>Flight Information</h3>
        <p className="info-item">Airline: {airlineName}</p>
        <p className="info-item">Departure Airport: {departureAirportCode}</p>
        <p className="info-item">Departure Date and Time: {formattedDepartureDateTime}</p>
        <p className="info-item">Price: {price?.total} {price?.currency}</p>
        <div><h3>Outbound Flight:</h3>
          <p className="info-item">Arrival Airport: {arrivalAirportCode}</p>
          <p className="info-item">Arrival Date and Time: {formattedArrivalDateTime}</p>
          <p className="info-item">Flight Duration: {readableDuration}</p>
          <p className="info-item">Number of Stops: {numberOfStops}</p>
          <p className="info-item">Cabin: {cabin}</p>
          <p className="info-item">Included Checked Bags: {includedCheckedBags}</p>
          <p className="info-item">Number of Seats Available: {numberOfBookableSeats}</p>
      </div>
      </div>

      {/* General Information */}
      <div className="section-container">
        <h3>General Information</h3>
        <p className="info-item">Origin: {submissionInfo.origin}</p>
        <p className="info-item">Destination: {submissionInfo.destination}</p>
        <p className="info-item">Trip Budget: ${submissionInfo.budget}</p>
        <p className="info-item">Number of Travelers: {submissionInfo.numOfTravelers}</p>
        <p className="info-item">Check In Date: {submissionInfo.checkInDate}</p>
        <p className="info-item">Check Out Date: {submissionInfo.checkOutDate}</p>
        <p className="info-item">Total Price of Trip: ${((parseFloat(selectedHotelInfo.offers.at(0).price.total) + parseFloat(price.total)).toFixed(2))}</p>
      </div>
      <div className="events">
        <h2>Events:</h2>
        <Events submissionInfo={submissionInfo} 
        vacationButton={vacationButton} setVacationButton={vacationButton} cityName={cityName}/>
      </div>
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
