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
  // const [loading, setLoading] = useState(false);
  const [listOfResultingHotelIds, setListOfResultingHotelIds] = useState("");
  const [activeHotelId, setActiveHotelId] = useState(false);
  const [hotels, setHotels] = useState(null);
  const handleChange = (hotelId) => (event, expanded) => {
    setActiveHotelId(expanded ? hotelId : false);
  };

  useEffect(() => {
    if (submissionInfo.destination) {
      // setLoading(true);
      getHotels(submissionInfo.destination).then((h) => {
        console.log("Hotel Data:", h); // Log the data
        setHotels(h);
        // setLoading(false);
      });

      // hotels.map((hotelInfo) =>{
      //   const { hotelId } = hotelInfo;

      //   setListOfResultingHotelIds(listOfResultingHotelIds + hotelId + ", ");
      //   // console.log("hotelId: ", hotelId);
      // });

      console.log(listOfResultingHotelIds);
      console.log("goin into pricing");

      getHotelPricing(/*hotels*/listOfResultingHotelIds, submissionInfo.numOfTravelers).then((offer) =>{
        console.log("got offers!");
        console.log("pricing info: ", offer);
        //set pricing info and add it to a list
      });
    } else {
      setHotels(null);
    }
  }, [submissionInfo.destination, submissionInfo.numOfTravelers, hotels]);

  return (
    <div>
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
