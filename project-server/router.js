// router.js
const axios = require("axios");
const {
  API_KEY,
  API_SECRET,
  TEST_MODE,
  TICKET_MASTER_API_KEY,
} = require("./config");
const Amadeus = require("amadeus");
const express = require("express");
const amadeus = new Amadeus({ clientId: API_KEY, clientSecret: API_SECRET }); // Initialize Amadeus
// Create router
const router = express.Router();
// ...
const API = "api";
const { readFileSync } = require("fs");

const fake_city_search_response = readFileSync(
  "test_responses/test_locations.json"
);
const fake_hotel_search_response = readFileSync(
  "test_responses/test_hotels.json"
);
const fake_hotel_offer_response = readFileSync(
  "test_responses/test_hotel_offer.json"
);

// City search suggestions
const city_search = async (req, res) => {
  console.log("searching on the server");
  const { keyword } = req.query;

  try {
    if (TEST_MODE == 1) {
      console.log("in testing modee");
      await res.json(JSON.parse(fake_city_search_response));
    } else {
      console.log("not in testing mode");
      const response = await amadeus.referenceData.locations.get({
        keyword,
        subType: Amadeus.location.city,
      });
      await res.json(JSON.parse(response.body));
    }
  } catch (err) {
    console.error("Error in city_search:", err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

router.get(`/${API}/search`, city_search);

// Querying hotels
router.get(`/${API}/hotels`, async (req, res) => {
  const { cityCode } = req.query;
  console.log("cityCode:", cityCode);

  try {
    if (TEST_MODE == 1) {
      console.log("in testing modee - hotels");
      await res.json(JSON.parse(fake_hotel_search_response));
    } else {
      console.log("not in testing mode - hotels");
      const response = await amadeus.referenceData.locations.hotels.byCity.get({
        cityCode,
      });
      console.log("response: ", response);
      await res.json(JSON.parse(response.body));
    }
  } catch (err) {
    console.error("Error in hotel search:", err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// Querying hotels offers

router.get(`/${API}/hotel-offers`, async (req, res) => {
  console.log("hello?");
  const { hotelIds, adults, checkInDate, checkOutDate } = req.query;
  console.log("req.query: ", req.query);

  try {
    var response = "";
    if (TEST_MODE == 1) {
      console.log("in testing modee - hotel offers");
      await res.json(JSON.parse(fake_hotel_offer_response));
    } else {
      response = await amadeus.shopping.hotelOffersSearch.get({
        hotelIds,
        adults,
        checkInDate,
        checkOutDate,
      });
    }

    console.log("response: ", response);

    try {
      await res.json(JSON.parse(response.body));
    } catch (err) {
      console.error("Error parsing response:", err);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request." });
    }
  } catch (err) {
    console.error("Error in hotel offers search:", err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

router.get(`/${API}/flight-offers`, async (req, res) => {
  try {
    const currencyCode = "USD";
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      returnDate,
      maxPrice,
    } = req.query;
    console.log("req.query: ", req.query);

    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      currencyCode,
      returnDate,
      maxPrice,
    });
    const json = JSON.parse(response.body);
    console.log("json flights: ", json);

    if (json && Array.isArray(json.data)) {
      res.json(json.data);
    } else {
      res
        .status(500)
        .json({ error: "Invalid response format from Amadeus API." });
    }
  } catch (err) {
    console.error("Error fetching flight offers:", err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

router.get("/api/events", async (req, res) => {
  try {
    const { city, startDateTime, endDateTime } = req.query;
    console.log("req.query: ", req.query);

    const response = await axios.get(
      "https://app.ticketmaster.com/discovery/v2/events.json",
      {
        params: {
          apikey: TICKET_MASTER_API_KEY,
          city,
          startDateTime,
          endDateTime,
        },
      }
    );
    console.log("response events12", response);
    res.json(response.data._embedded.events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
