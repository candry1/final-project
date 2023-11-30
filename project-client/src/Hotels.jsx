import { useEffect, useState, useRef } from "react";
import "./Hotels.css";
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

const Hotels = ({ submissionInfo, onSubmit, selectedFlight, selectedHotel, setSelectedHotel, onChooseHotel, setOnChooseHotel,  selectedHotelInfo, setSelectedHotelInfo }) => {
  const [loading, setLoading] = useState(true);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [listOfResultingHotelIds, setListOfResultingHotelIds] = useState("");
  // const [currentSelectedFlightPrice, setCurrentSelectedFlightPrice] = useState(0);
  const [activeHotelId, setActiveHotelId] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [hotelAndPricingArray, setHotelAndPricingArray] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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
  const calculateNumberOfNights = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDifference = checkOut - checkIn;
    const numberOfNights = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    return Math.ceil(numberOfNights);
  };
  const calculateTotalPrice = (numberOfNights, pricePerNight) => {
    let total = numberOfNights*pricePerNight;
    return parseFloat(total).toFixed(2);
  };
  useEffect(() => {
    // Your code here that should run when onSubmit changes
    console.log('onSubmit has changed:', onSubmit);

  }, [onSubmit]);

  useEffect(() => {
    setHotelAndPricingArray([])
    setHotels([])
    const fetchData = async () => {
      if (onSubmit === true && isMounted.current) {
        setLoading(true); // Set loading to true when fetching starts
        try {
          const hotelData = await getHotels(submissionInfo.destination);
          setHotels(hotelData);
          if (hotelData.length === 0) {
            setLoading(false); // Set loading to false since the fetching is done
            return (
              <div>
                <h1>Hotels</h1>
                <p>No hotels available for your search.</p>
              </div>
            );
          }
          // console.log("hotels123", hotels);
          const hotelIdsArray = hotelData.map((hotel) => hotel.hotelId);
          setListOfResultingHotelIds(hotelIdsArray)

          const chunkedHotelIds = chunkArray(hotelIdsArray, 50);
          const uniqueHotelIds = new Set();

            const pricingPromises = chunkedHotelIds.map(async (stringHotelIds) => {
              try {
                await delay(5000); // Wait for 1 second between requests
                const pricingOffer = await getHotelPricing(stringHotelIds, submissionInfo.numOfTravelers, submissionInfo.checkInDate, submissionInfo.checkOutDate);
                // console.log('pricingOffer count: ', pricingOffer);
                setLoading(false);
                if (pricingOffer.data && pricingOffer.data.length > 0) {
                  const offersArray = pricingOffer.data;
                  // console.log('offersArray: ', offersArray);
                  const uniqueOffers = offersArray.filter(
                    (offer) => !uniqueHotelIds.has(offer.hotel.hotelId)
                  );
                  uniqueOffers.forEach((offer) => {
                    uniqueHotelIds.add(offer.hotel.hotelId);
                  });
                  
                  setHotelAndPricingArray((prevHotels) => [
                    ...prevHotels,
                    ...uniqueOffers.map((offer) => ({ offer })),
                  ]);
                  // offersArray.forEach((offer) => {
                  //   setHotelAndPricingArray((prevHotels) => [
                  //     ...prevHotels,
                  //     { offer },
                  //   ]);
                  // });
                }
                setLoading(false);
              } catch (error) {
                setLoading(false);
                console.error(
                  `Error fetching hotel pricing for ${stringHotelIds}:`,
                  error
                );
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

//  hotelAndPricingArray.map((id) => {
//   console.log("hotel name12",id.offer.hotel.name)
//  })
useEffect(() => {
  console.log("hotelAndPricingArray123: ", hotelAndPricingArray);

  // hotelAndPricingArray.forEach((item) => {
  //   console.log("hotel name: ", item.offer.hotel.name);
  // });
}, [hotelAndPricingArray]);

  return (
    <div>
      <h1>Hotels</h1>
      {loading && <p>Loading Your Hotels... <CircularProgress/></p> } {}
      {!loading && hotels.length === 0 && (
        <p>No hotels available for your search.</p>
      )}
      {!loading && hotelAndPricingArray.length === 0 && (
        <p>No hotels available for your search.</p>
      )}
      {!loading && hotels !== null && hotels.length === 0 && hotelAndPricingArray.length === 0 && (
        <p>No hotels available for your search.</p>
      )}

        {
 hotelAndPricingArray.map((id) => {
 })}
      
      {hotelAndPricingArray && hotelAndPricingArray.map((hotelInfoPair, index) => {
          const name = hotelInfoPair.offer.hotel.name;
          const hotelId = hotelInfoPair.offer.hotel.hotelId;
          const price = hotelInfoPair.offer.offers.at(0).price.total;
          const active = activeHotelId === hotelId;
          const numberOfNights = calculateNumberOfNights(submissionInfo.checkInDate, submissionInfo.checkOutDate);
          const hotelOffer = hotelInfoPair.offer.offers.at(0);
          let description = ""; // Define these variables outside the if block
          let roomType = "";
          let numberOfAdults = "";

          if (hotelOffer && hotelOffer.price && hotelOffer.price.variations) {
            const pricePerNight = hotelOffer.price.variations.average.base;

            roomType = hotelOffer.room.type;
            numberOfAdults = hotelOffer.guests.adults;
          }

          if (hotelOffer.room.description) {
            description = hotelOffer.room.description.text;
          }
          // let pricePerNight = hotelInfoPair.offer.offers.at(0).price.variations;
          // console.log('name: ', hotelId,'pricePerNight: ', pricePerNight);
          const budgetOfVacation = parseFloat(submissionInfo.budget)
          const chooseHotel = (hotelId, hotelInfoPair) => {
            // Update selectedHotel when the button is clicked
            setSelectedHotelId(hotelId);
            setSelectedHotel(price);
            setOnChooseHotel(true);

            setSelectedHotelInfo(hotelInfoPair.offer);
            console.log('hotelInfoPair: ', hotelInfoPair);
            console.log("selectedHotelInfo", selectedHotelInfo);
            console.log('selectedHotelId: ', selectedHotelId);
            console.log("selectedHotel", selectedHotel);
          };

          if (price <= budgetOfVacation) {
            return (
              <Accordion
                // key={hotelId}
                expanded={active}
                onChange={handleChange(hotelId)}
                
                key={`${hotelId}-${index}`} // Ensure a unique key for each Accordion
                className={selectedHotelId === hotelId ? "selected-accordion" : ""}
              >
                <AccordionSummary className= "accordion-summary" expandIcon={<ExpandIcon />}>
                  <div>
                    <div>
                      <Typography>{name}</Typography>
                      <Typography>Total Price: ${price}</Typography>
                      <Typography color="textSecondary"></Typography>
                    </div>
                  </div>
                </AccordionSummary>
                <Typography>Check-In: {hotelInfoPair.offer.offers.at(0).checkInDate}</Typography>
                <Typography>Check-Out: {hotelInfoPair.offer.offers.at(0).checkOutDate}</Typography>
                <Typography>Total Price: ${price}</Typography>
                <Typography> Number of Nights: {numberOfNights}</Typography>
                {hotelOffer && hotelOffer.price && hotelOffer.price.variations ? (
                  <Typography>Price Per Night: ${hotelOffer.price.variations.average.base}</Typography>
                ) : (
                  <Typography>Price Per Night: N/A</Typography>
                )}
                {hotelOffer && hotelOffer.room.description ? (
                  <Typography>Room Description: {description}</Typography>
                ) : (
                  <Typography>Room Description: N/A</Typography>
                )}
                <Typography>Room Type: {roomType}</Typography>
                <Typography>Number of Adults: {numberOfAdults}</Typography>
                <button 
              onClick={() => chooseHotel(hotelId, hotelInfoPair)}
              className={selectedHotelId === hotelId ? "selected-button" : ""}
            >
              Choose this hotel
            </button>
                
              </Accordion>
            );
          } else {
            // If the hotel price is not within the budget, don't render the Accordion for that hotel
            return null;
          }
          
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