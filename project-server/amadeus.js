const { API_KEY, API_SECRET } = require("./config");
const Amadeus = require("amadeus");
const amadeus = new Amadeus({ clientId: API_KEY, clientSecret: API_SECRET }); // Initialize Amadeus

const hotelIds = "ALCHI347";
const adults = 2;
(async () => {
  const response = await amadeus.shopping.hotelOffersSearch.get({
    hotelIds,
    adults: 2,
  });

  console.log(response);
})();
