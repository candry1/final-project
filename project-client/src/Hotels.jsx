import React, { useEffect, useState } from "react";
import { getHotels } from "./api";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Typography,
  makeStyles,
} from "@mui/material";

import { Apartment as HotelIcon, ExpandMore as ExpandIcon } from "@mui/icons-material";


const Hotels = ({ submissionInfo }) => {
  // const [loading, setLoading] = useState(false);
  const [activeHotelId, setActiveHotelId] = useState(false);
  const [hotels, setHotels] = useState(null);
  const handleChange = (hotelId) => (event, expanded) => {
    setActiveHotelId(expanded ? hotelId : false);
  };

  useEffect(() => {
    if (submissionInfo.destination) {
      // setLoading(true);
      getHotels(
        submissionInfo.destination
      )
        .then((hotels) => {
          console.log("Hotel Data:", hotels); // Log the data
          setHotels(hotels);
          // setLoading(false);
        })
    } else {
      setHotels(null);
    }
  }, [submissionInfo.destination]);
  return (
    <div >
      {hotels &&
        hotels.map((hotel) => {
          const { name, hotelId, media} = hotel;
          const image = media ? media[0].uri : "";
          const active = activeHotelId === hotelId;
          return (
            <Accordion
              key={hotelId}
              expanded={active}
              onChange={handleChange(hotelId)}
            >
              <AccordionSummary expandIcon={<ExpandIcon />}>
                <div >
                  <div >
                    {image ? (
                      <img
                        src={image}
                        alt="HOTEL"
                      />
                    ) : (
                      <HotelIcon  />
                    )}
                  </div>
                  <div>
                    <Typography >
                      {name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                    >
                    </Typography>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>{/* Display offers */}</AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
};

export { Hotels };
