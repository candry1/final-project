const { API_KEY, API_SECRET } = require("./config");
const Amadeus = require("amadeus");
const amadeus = new Amadeus({ clientId: API_KEY, clientSecret: API_SECRET }); // Initialize Amadeus

const hotelIds = "ALCHI347";

(async () => {
  const response = await amadeus.referenceData.shopping.hotel.offers.get({
    hotelIds,
  });

  console.log(response);
})();
