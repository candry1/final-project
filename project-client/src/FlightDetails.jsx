import { getFlights } from "./api";
import { useEffect, useState } from "react";
import airlineCodeToName from './airlineCodes';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
  } from "@mui/material";

import {
  Apartment as HotelIcon,
  ExpandMore as ExpandIcon,
} from "@mui/icons-material";

const FlightDetails = ({ flight, activeFlightId, onChange }) => {
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
    } = flight;
    
  
        const active = activeFlightId === id;
             // Extracting airline and departure information
          const firstSegment = itineraries[0]?.segments[0];
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
          const numberOfTravelers = flight.travelerPricings.length;
          // Format date and time
          const formattedDepartureDateTime = new Date(departureDateTime).toLocaleString();
          const formattedArrivalDateTime = new Date(arrivalDateTime).toLocaleString()
         
    return (
      <Accordion
        key={id}
        expanded={active}
        onChange={(event, expanded) => onChange(expanded ? id : false)}
      >
            <AccordionSummary expandIcon={<ExpandIcon />}>
            <div>
                <div>
                <Typography>
                        ID: {id}
                      </Typography>
                <Typography>Airline: {airlineName}</Typography>
                <Typography>Departure Airport: {departureAirportCode}</Typography>
                <Typography>Departure Date and Time: {formattedDepartureDateTime}</Typography>
                <Typography>Price: {price?.total} {price?.currency}</Typography>
                </div>
            </div>
            </AccordionSummary>

        <AccordionDetails>
        <AccordionDetails>
            <div>
                
            Outbound Flight
                <Typography>Arrival Airport: {arrivalAirportCode}</Typography>
                <Typography>Arrival Date and Time: {formattedArrivalDateTime}</Typography>
                <Typography>Flight Duration: {readableDuration}</Typography>
                <Typography>Number of Stops: {numberOfStops}</Typography>
                <Typography>Cabin: {cabin}</Typography>
                <Typography>Included Checked Bags: {includedCheckedBags}</Typography>
                <Typography>Number of Travelers: {numberOfTravelers}</Typography>
                <Typography>Number of Seats Available: {numberOfBookableSeats}</Typography>
            </div>
             
               
            </AccordionDetails>
          {/* ... (display outbound flight details) */}
          {/* Add a section for the return flight */}
          <Accordion
            key={`return-${id}`} // Use a unique key for the return flight Accordion
            expanded={activeFlightId === `return-${id}`}
            onChange={(event, expanded) =>
              onChange(expanded ? `return-${id}` : false)
            }
          >
            <AccordionDetails>
              Return Flight
              <div>
                
                {itineraries[1].segments.map((segment, index) => (
                    <div key={index}>
                      <Typography>
                        Departure Airport: {segment.departure.iataCode}
                      </Typography>
                      <Typography>
                        Departure Date and Time: {new Date(segment.departure.at).toLocaleString()}
                      </Typography>
                    <Typography>Arrival Airport: {segment.arrival.iataCode}</Typography>
                    <Typography>Arrival Date and Time:  {new Date(segment.arrival.at).toLocaleString()}</Typography>
                    <Typography>Flight Duration: {formatDuration(segment.duration)}</Typography>
                    <Typography>Number of Stops: {segment.numberOfStops}</Typography>
             
                    </div>
                  ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    );
  };
  
  export default FlightDetails;
  
