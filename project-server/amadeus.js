const { API_KEY, API_SECRET } = require("./config");
const Amadeus = require("amadeus");
const amadeus = new Amadeus({ clientId: API_KEY, clientSecret: API_SECRET }); // Initialize Amadeus

const hotelIds = "RTPAR001";
const adults = 2;
(async () => {
  const response = await amadeus.shopping.hotelOffersSearch.get({
    hotelIds,
    adults,
  });

  console.log(response);
})();

// const cityCode = "CHI";

// (async () => {
//   const response = await amadeus.referenceData.locations.hotels.byCity.get({
//     cityCode,
//     // checkInDate,
//     // checkOutDate,
//   });

//   console.log(response);
// })();