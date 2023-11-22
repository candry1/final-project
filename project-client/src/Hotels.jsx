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
  const [currentSelectedFlightPrice, setCurrentSelectedFlightPrice] = useState(0);
  const [activeHotelId, setActiveHotelId] = useState(false);
  const [hotels, setHotels] = useState(null);
  const [hotelAndPricingArray, setHotelAndPricingArray] = useState([]);
  const handleChange = (hotelId) => (event, expanded) => {
    setActiveHotelId(expanded ? hotelId : false);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // TODO: MAKE INTO A STRING NOT AN ARRAY
  const chunkArray = (array, chunkSize) => {
    var finalArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      var result = "";
      result += array.slice(i, i + chunkSize).join(',');
      finalArray.push(result);
      // result.push(array.slice(i, i + chunkSize));
      console.log("result: " + result);
    }
    console.log("finalArray: " + finalArray);
    return finalArray;
  };
  

  useEffect(() => {
    const fetchData = async () => {
      if (submissionInfo.destination) {
        try {
          const hotelData = await getHotels(submissionInfo.destination);
          // console.log('hotelData: ', hotelData);
          setHotels(hotelData);
          const hotelIdsArray = hotelData.map((hotel) => hotel.hotelId);
          // console.log("listOfResultingHotelIds", listOfResultingHotelIds);
          setListOfResultingHotelIds(hotelIdsArray)

          const chunkedHotelIds = chunkArray(hotelIdsArray, 50);
          console.log("Chunkhotelid: ", chunkedHotelIds);

          // for (const chunk of chunkedHotelIds) {


            const pricingPromises = chunkedHotelIds.map(async (stringHotelIds) => {
              try {
                await delay(5000); // Wait for 1 second between requests
                const pricingOffer = await getHotelPricing(stringHotelIds, 1);
                
                // console.log(`Pricing info for hotel ${stringHotelIds}: `, pricingOffer);
                // Set pricing info and add it to a list if needed
                if (pricingOffer) {
                  // Pricing offer array is not empty
                  console.log(`Number of offers for hotel ${stringHotelIds}: ${pricingOffer.data.length}`);
                  // Set pricing info and add it to a list if needed
                  

                  //loop through hotel IDs(hotelIdsArray), and for each one that has a matching 
                  // hotel offer(pricingOffer.data and access the hotelId), add it and the offer to a array
                  const currentHotelIdArray = stringHotelIds.split(",");
                  currentHotelIdArray.map((hotelId)=>{ 
                    pricingOffer.data.map((offer)=>{
                      if(offer.hotel.hotelId == hotelId){
                        setHotelAndPricingArray((prevHotels) => [...prevHotels, { hotelId,  offer}
                      ]);
                    }})
                    
                  })

                  // WORKING!! YAY!
                  // console.log("hotelprinsgugfdgsyuhgx: ", hotelAndPricingArray);
                } 
              } catch (error) {
                console.error(`Error fetching hotel pricing for ${stringHotelIds}:`, error);
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
      {hotelAndPricingArray &&
        hotelAndPricingArray.map((hotelInfoPair) => {
          console.log("hotelprinsgugfdgsyuhgx: ", hotelAndPricingArray);
        {/* hotelAndPricingArray.filter((hotel) => hotel.price <= (budget - currentSelectedFlightPrice)).map((hotel) => { */}
          const name = hotelInfoPair.offer.hotel.name;
          const hotelId = hotelInfoPair.hotelId;
          const price = hotelInfoPair.offer.offers.at(0).price.total;
          {/* const { name, hotelId, media } = hotelInfoPair; */}
          {/* const image = media ? media[0].uri : ""; */}
          const active = activeHotelId === hotelId;

          return (
            <Accordion
              key={hotelId}
              expanded={active}
              onChange={handleChange(hotelId)}
            >
              <AccordionSummary expandIcon={<ExpandIcon />}>
                <div>
            
                  {/* <div>
                    {image ? <img src={image} alt="HOTEL" /> : <HotelIcon />}
                  </div> */}
                  <div>
                    <Typography>{name}</Typography>
                    <Typography color="textSecondary"></Typography>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>Total = ${price}</AccordionDetails>
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
