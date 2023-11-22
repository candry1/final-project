import { useEffect, useState } from "react";
import { getHotels, getHotelPricing } from "./api";
import { CircularProgress} from "@mui/material";
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

const Hotels = ({ submissionInfo, onSubmit }) => {
  const [loading, setLoading] = useState(true);
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
     
    }
    // console.log("finalArray: " + finalArray);
    return finalArray;
  };
  

  useEffect(() => {
    const fetchData = async () => {
      if (onSubmit = true) {
        setLoading(true); // Set loading to true when fetching starts
        try {
          const hotelData = await getHotels(submissionInfo.destination);
          console.log('hotelData counts: ', hotelData);
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
                const pricingOffer = await getHotelPricing(stringHotelIds, submissionInfo.numOfTravelers);
                console.log('pricingOffer count: ', pricingOffer);
             
                // console.log(`Pricing info for hotel ${stringHotelIds}: `, pricingOffer);
                // Set pricing info and add it to a list if needed
                if (pricingOffer.length > 0) {
                  // Pricing offer array is not empty
                  // console.log(`Number of offers for hotel ${stringHotelIds}: ${pricingOffer.data.length}`);
                
                  // Set pricing info and add it to a list if needed
                  

                  //loop through hotel IDs(hotelIdsArray), and for each one that has a matching 
                  // hotel offer(pricingOffer.data and access the hotelId), add it and the offer to a array
                  const currentHotelIdArray = stringHotelIds.split(",");
                  // console.log("currentHotelIdArray",currentHotelIdArray);
                  // currentHotelIdArray.map((hotelId)=>{ 
                  //   pricingOffer.map((offer)=>{
                  //     if(offer.hotel.hotelId == hotelId){
                  //       // console.log("offer", offer);
                  //       console.log("the hotel id", hotelId);
                  //       setHotelAndPricingArray((prevHotels) => [...prevHotels, { hotelId,  offer}
                  //     ]);
                  //   }})
                    
                  // })
                  console.log('pricingOffer: ', pricingOffer);
                    pricingOffer.map((offer)=>{
                        console.log("offer hotel id123", offer.hotel.hotelId);
        
                        // console.log("offer", offer);
                        // console.log("the hotel id", hotelId);
                        setHotelAndPricingArray((prevHotels) => [...prevHotels, {offer}
                      ]);
                    })
                 
                  // WORKING!! YAY!
                  console.log("hotelAndPricingArray123: ", hotelAndPricingArray);
                } 
                setLoading(false);
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
  }, [onSubmit]);

 hotelAndPricingArray.map((id) => {
  console.log("hotel name12",id.offer.hotel.name)
 })
  return (
    <div>
      <h1>Hotels</h1>
      {loading && <p>Loading Your Hotels... <CircularProgress/></p> } {}
      {hotelAndPricingArray && hotelAndPricingArray.length === 0 && !loading && <p>No hotels available for your search.</p>}
      {hotelAndPricingArray && hotelAndPricingArray.map((hotelInfoPair) => {
      // {hotelAndPricingArray && hotelAndPricingArray.filter((hotelInfoPair) => 0 <= (submissionInfo.budget - hotelInfoPair.offer.offers.at(0).price.total)).map((hotelInfoPair) => {
          
        {/* hotelAndPricingArray.filter((hotel) => hotel.price <= (budget - currentSelectedFlightPrice)).map((hotel) => { */}
          const name = hotelInfoPair.offer.hotel.name;
          const hotelId = hotelInfoPair.offer.hotel.hotelId;
          const price = hotelInfoPair.offer.offers.at(0).price.total;
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
              <AccordionDetails>
              Check-In: {submissionInfo.checkInDate}
              Check-In: {submissionInfo.checkOutDate}
              Total: ${price}
              </AccordionDetails>
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
