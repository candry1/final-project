// router.js
const { API_KEY, API_SECRET } = require("./config");
const Amadeus = require("amadeus");
const express = require("express");
const amadeus = new Amadeus({ clientId: API_KEY, clientSecret: API_SECRET }); // Initialize Amadeus
// Create router
const router = express.Router();
// ...
const API = "api";

// City search suggestions
router.get(`/${API}/search`, async (req, res) => {
  console.log("server side here");
  const { keyword } = req.query;
  console.log("keyword: ", keyword);

  try {
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: Amadeus.location.city,
    });
    console.log("response: ", response);
    // console.log("response body: ", res.json(JSON.parse(response.body)));
    await res.json(JSON.parse(response.body));
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// Querying hotels
router.get(`/${API}/hotels`, async (req, res) => {
  const { cityCode, checkInDate, checkOutDate } = req.query;
  console.log("checkOutDate: ", checkOutDate);
  console.log("checkInDate: ", checkInDate);
  console.log("cityCode:", cityCode); // Log the cityCode
  const response = await amadeus.referenceData.locations.hotels.byCity.get({
    cityCode,
    // checkInDate,
    // checkOutDate,
  });
  // console.log("Response from Amadeus:", response.body); // Log the response
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// Querying hotels offers
router.get(`/${API}/hotel-offers`, async (req, res) => {
  const { hotelIds, adults } = req.query;
  console.log("adults: ", adults);
  console.log("hotelIds: ", hotelIds);
  const response = await amadeus.shopping.hotelOffersSearch.get({
    hotelIds,
    adults,
  });
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

module.exports = router;
