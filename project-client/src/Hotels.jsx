import { useEffect, useState } from "react";
import { getHotels, getHotelPricing } from "./api";
import PropTypes from "prop-types";
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

const Hotels = ({ submissionInfo }) => {
  const [listOfResultingHotelIds, setListOfResultingHotelIds] = useState("");
  const [activeHotelId, setActiveHotelId] = useState(false);
  const [hotels, setHotels] = useState(null);
  const handleChange = (hotelId) => (event, expanded) => {
    setActiveHotelId(expanded ? hotelId : false);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchData = async () => {
      if (submissionInfo.destination) {
        try {
          const hotelData = await getHotels(submissionInfo.destination);
          console.log('hotelData: ', hotelData);
          setHotels(hotelData);
          const hotelIdsArray = hotelData.map((hotel) => hotel.hotelId);
          console.log("listOfResultingHotelIds", listOfResultingHotelIds);
          setListOfResultingHotelIds(hotelIdsArray)

          const pricingPromises = hotelIdsArray.map(async (hotelId) => {
            try {
              await delay(5000); // Wait for 1 second between requests
              const pricingOffer = await getHotelPricing(hotelId, 1);
              
              console.log(`Pricing info for hotel ${hotelId}: `, pricingOffer);
              // Set pricing info and add it to a list if needed
              if (pricingOffer && pricingOffer.length > 0) {
                // Pricing offer array is not empty
                console.log(`Number of offers for hotel ${hotelId}: ${pricingOffer.length}`);
                // Set pricing info and add it to a list if needed
                setAllHotels((prevHotels) => [...prevHotels, { hotelId, pricingOffer }]);
              } 
            } catch (error) {
              console.error(`Error fetching hotel pricing for ${hotelId}:`, error);
            }
          });


          await Promise.all(pricingPromises); // Wait for all pricing requests to finish
        } catch (error) {
          console.error("Error fetching hotel data:", error);
        }
      } else {
        setHotels([]);
      }
    };


    fetchData();
  }, [submissionInfo.destination, submissionInfo.numOfTravelers]);


  return (
    <div>
      <h1>Hotels</h1>
      {hotels &&
        hotels.map((hotel) => {
          const { name, hotelId, media } = hotel;
          const image = media ? media[0].uri : "";
          const active = activeHotelId === hotelId;

          return (
            <Accordion
              key={hotelId}
              expanded={active}
              onChange={handleChange(hotelId)}
            >
              <AccordionSummary expandIcon={<ExpandIcon />}>
                <div>
            
                  <div>
                    {image ? <img src={image} alt="HOTEL" /> : <HotelIcon />}
                  </div>
                  <div>
                    <Typography>{name}</Typography>
                    <Typography color="textSecondary"></Typography>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>Display offers</AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
};

Hotels.propTypes = {
  submissionInfo: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    checkInDate: PropTypes.string.isRequired,
    checkOutDate: PropTypes.string.isRequired,
    numOfTravelers: PropTypes.number.isRequired,
  }).isRequired,
};

export { Hotels };
