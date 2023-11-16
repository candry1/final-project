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

  useEffect(() => {
    if (submissionInfo.destination) {

      getHotels(submissionInfo.destination).then((h) => {
        console.log("Hotel Data:", h); // Log the data
        setHotels(h);
        console.log("state hotel: ", hotels);
      });

      console.log("hotels: ", hotels);

      var hotelIdsString = hotels.map(hotel => hotel.hotelId).join(',%20');

      console.log("hotelIdsString: ", hotelIdsString);


      // hotels.map((hotelInfo) =>{
      //   const { hotelId } = hotelInfo;

      //   console.log("before gethotelpricing");
      //   getHotelPricing(/*"BRCHISRB, ALCHI347, RTPAR001"*/hotelId, 1).then((offer) =>{
      //     console.log("pricing info: ", offer);
      //     //set pricing info and add it to a list
      //   }).catch((error) => {
      //     console.error("Error fetching hotel pricing:", error);
      //   });
        
      // });


    } else {
      setHotels(null);
    }
  }, [submissionInfo.destination, submissionInfo.numOfTravelers, hotels]);

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
