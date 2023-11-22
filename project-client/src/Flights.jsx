import { getFlights } from "./api";
import { useEffect, useState } from "react";
import { CircularProgress} from "@mui/material";
import FlightDetails from './FlightDetails';
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

const Flights = ({ submissionInfo, onSubmit }) => {
    const [activeFlightId, setActiveFlightId] = useState(false);
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleChange = (flightId) => (event, expanded) => {
        setActiveFlightId(expanded ? flightId : false);
    };
        

    useEffect(() => {
        if (onSubmit = true) {
            setLoading(true); // Set loading to true when fetching starts
            console.log("getting flights count");
            getFlights(submissionInfo.origin, submissionInfo.destination, "2024-05-02", 1, "2024-05-10", 800)
                .then((flights) => {
                    // Sort flights by price in ascending order
                    const sortedFlights = flights.sort((a, b) => a.price.total - b.price.total);
                    // Take the first 5 flights (the cheapest ones)
                    const cheapestFlights = sortedFlights.slice(0, 5);
                    console.log('cheapestFlights: ', cheapestFlights);
                    setFlights(cheapestFlights);
                })
                .catch((error) => {
                    // Handle errors if needed
                    console.error("Error fetching flights:", error);
                })
                .finally(() => setLoading(false)); // Set loading to false when fetching is complete
        } else {
            setFlights(null);
        }
    }, [onSubmit]);


    return (
        <div>
        <h1>Flights</h1>
        {loading && <p>Loading Your Flights... <CircularProgress/></p> } {}
        {flights && flights.length === 0 && !loading && <p>No flights available for your search.</p>}
        {flights &&
          flights.map((flight) => (
            <FlightDetails
              key={flight.id}
              flight={flight}
              activeFlightId={activeFlightId}
              onChange={(id) => setActiveFlightId(id)}
            />
          ))}
      </div>
  );
};

    
export { Flights };
  
