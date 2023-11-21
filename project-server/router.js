// router.js
const { API_KEY, API_SECRET, TEST_MODE } = require("./config");
const Amadeus = require("amadeus");
const express = require("express");
const amadeus = new Amadeus({ clientId: API_KEY, clientSecret: API_SECRET }); // Initialize Amadeus
// Create router
const router = express.Router();
// ...
const API = "api";
const { readFileSync } = require('fs');

const fake_city_search_response = readFileSync("test_responses/test_locations.json");
const fake_hotel_search_response = readFileSync("test_responses/test_hotels.json");
const fake_hotel_offer_response = readFileSync("test_responses/test_hotel_offer.json");

// City search suggestions
const city_search = async (req, res) => {
  console.log("searching on the server");
  const { keyword } = req.query;
  // console.log("keyword: ", keyword);

  try {
    if(TEST_MODE == 1) {
      console.log("in testing modee");
      await res.json(JSON.parse(fake_city_search_response));
    } else {
      console.log("not in testing mode");
      const response = await amadeus.referenceData.locations.get({
        keyword,
        subType: Amadeus.location.city,
      });
      // console.log("response: ", response);
      // console.log("response body: ", res.json(JSON.parse(response.body)));
      await res.json(JSON.parse(response.body));
    }
  } catch (err) {
    console.error("Error1:", err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

router.get(`/${API}/search`,city_search);




// Querying hotels
router.get(`/${API}/hotels`, async (req, res) => {
  const { cityCode, checkInDate, checkOutDate } = req.query;
  console.log("checkOutDate: ", checkOutDate);
  console.log("checkInDate: ", checkInDate);
  console.log("cityCode:", cityCode); // Log the cityCode

  if(TEST_MODE == 1) {
    console.log("in testing modee - hotels");
    await res.json(JSON.parse(fake_hotel_search_response));
  } else {
    console.log("not in testing mode - hotels");
    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode,
      // checkInDate,
      // checkOutDate,
    });
  
    // console.log("Response from Amadeus:", response.body); // Log the response
    try {
      await res.json(JSON.parse(response.body));
    } catch (err) {
      console.error("Error2:", err);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request." });
    }
  }
});

// Querying hotels offers
router.get(`/${API}/hotel-offers`, async (req, res) => {
  console.log("hello?");
  const { hotelIds, adults } = req.query;
  console.log("req.query: ", req.query);
  // const response = await amadeus.shopping.hotelOffersSearch.get({
  //   hotelIds,
  //   adults,
  // });
  // console.log("response: ", response);
  try {
    const response = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds,
      adults,
    });
    console.log("response: ", response);

    const json = JSON.parse(response.body);

    if (json && Array.isArray(json.data)) {
      res.json(json.data);
    } else {
      res
        .status(500)
        .json({ error: "Invalid response format from Amadeus API." });
    }
  } catch (err) {
    console.error("Error fetching hotel offers:", err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

module.exports = router;

// only during data collection:
// call your functions with specific parameters
// save the resulting json response to a file with a specific name
// comment out when just using as part of the web ap
const create_testing_data = async () => {

  const response = await amadeus.shopping.hotelOffersSearch.get({
    hotelIds: "ALCHI347",
    adults: 2,
  });

  console.log(response.body);
}

// create_testing_data();