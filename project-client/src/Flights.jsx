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

const Flights = ({ submissionInfo, onSubmit, selectedFlight, setSelectedFlight, selectedHotel, 
  onChooseHotel,setOnChooseFlight, setSelectedFlightPrice, selectedFlightPrice, selectedFlightInfo, setSelectedFlightInfo}) => {
    const [activeFlightId, setActiveFlightId] = useState(false);
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState();
    const handleChange = (flightId) => (event, expanded) => {
        setActiveFlightId(expanded ? flightId : false);
    };
    let maxPrice = parseInt(submissionInfo.budget - selectedHotel, 10);

    useEffect(() => {
        if (selectedHotel) {
          console.log('onChooseHotel: ', selectedHotel);
            setLoading(true); // Set loading to true when fetching starts
            console.log("getting flights count");
            console.log("max price", maxPrice);

            getFlights(submissionInfo.origin, submissionInfo.destination, submissionInfo.checkInDate, submissionInfo.numOfTravelers, submissionInfo.checkOutDate, maxPrice)
                .then((flights) => {
                  console.log('flights: ', flights);
                  
                    // Sort flights by price in ascending order
                    const sortedFlights = flights.sort((a, b) => a.price.total - b.price.total);
                    // Take the first 5 flights (the cheapest ones)
                    const cheapestFlights = sortedFlights.slice(0, 5);
                    console.log('cheapestFlights: ', cheapestFlights);
                    // console.log('flights: ', flights);
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
    }, [selectedHotel]);


    return (
        <div>
        <h1>Flights</h1>
        {!onChooseHotel && <p>Please choose a hotel to see flights... </p> } {}
        {loading && <p>Loading Your Flights... <CircularProgress/></p> } {}
        {flights && flights.length === 0 && !loading && <p>No flights available for your search. 
          Your budget after hotel is ${(submissionInfo.budget - selectedHotel).toFixed(2)}.</p>}
          {flights && flights.length > 0 && (
          <div>
            <p>Your budget after hotel is ${(submissionInfo.budget - selectedHotel).toFixed(2)}</p>
            {flights.map((flight) => (
              <FlightDetails
                key={flight.id}
                flight={flight}
                activeFlightId={activeFlightId}
                onChange={(id) => setActiveFlightId(id)}
                selectedFlight={selectedFlight}
                setSelectedFlight={setSelectedFlight}
                setOnChooseFlight={setOnChooseFlight}
                setSelectedFlightPrice={setSelectedFlightPrice}
                selectedFlightPrice={selectedFlightPrice}
                selectedFlightInfo={selectedFlightInfo}
                setSelectedFlightInfo={setSelectedFlightInfo}
              />
            ))}
          </div>
      )}
      </div>
  );
};

    
export { Flights };
  
