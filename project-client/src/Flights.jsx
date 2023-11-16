import { getFlights } from "./api";
import { useEffect, useState } from "react";
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

const Flights = ({ submissionInfo }) => {
    const [activeFlightId, setActiveFlightId] = useState(false);
    const [flights, setFlights] = useState([]);
    const handleChange = (flightId) => (event, expanded) => {
        setActiveFlightId(expanded ? flightId : false);
    };
    useEffect(() => {
        if (submissionInfo.destination) {
          // setLoading(true);
          getFlights(submissionInfo.origin, submissionInfo.destination, "2024-05-02", 1).then((flights) => {
            console.log("flights Data:", flights); // Log the data
            setFlights(flights);
            console.log("where are the flights",flights);
            // setLoading(false);
          });
        } else {
          setFlights(null);
        }
      }, [submissionInfo.destination]);


    return (
        <div>
      <h1>Flights!!</h1>
      {flights &&
        flights.map((flight) => {
            const { flightId, itineraries, price } = flight;
            const active = activeFlightId === flightId;
             // Extracting airline and departure information
          const firstSegment = itineraries[0]?.segments[0];
          const airlineCode = firstSegment?.carrierCode;
          const departureAirportCode = firstSegment?.departure.iataCode;
          const departureDateTime = firstSegment?.departure.at;

          return (
            <Accordion
              key={flightId}
              expanded={active}
              onChange={handleChange(flightId)}
            >
              <AccordionSummary expandIcon={<ExpandIcon />}>
                <div>
                  <div>
            
                  </div>
                  <div>
                    <div>
                    <Typography>Airline: {airlineCode}</Typography>
                    <Typography>Departure Airport: {departureAirportCode}</Typography>
                    <Typography>Departure Date and Time: {departureDateTime}</Typography>
                    <Typography>Price: {price?.total} {price?.currency}</Typography>
                  </div>
                    <Typography color="textSecondary"></Typography>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>Display flight offers</AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
};

    
export { Flights };
  
