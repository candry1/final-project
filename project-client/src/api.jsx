import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.baseURL = "https://getawayguide123.onrender.com/";
// axios.defaults.baseURL = "https://getawayguide123.onrender.com/";
const search = (input) => {
  if (input) {
    try {
      const request = axios.get(`/api/search?keyword=${input}`);
      // console.log(request);
      return {
        async process(callback) {
          request.then((response) => {
            const json = response.data;
            // console.log("json test info: " + json.data);

            if (json && json.data) {
              callback(
                json.data.map(({ address }) => {
                  return {
                    city: address.cityName,
                    code: address.cityCode,
                    country: address.countryName,
                    state: address.stateCode,
                  };
                }),
              );
            }
          });
        },
        // No need for cancel function in this version
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request was canceled", error.message);
      } else {
        console.error("Request failed:", error);
      }
      console.error(error);
    }
  }
  console.log("something went wronggggggggg");
  return {
    process() {
      return [];
    },
    // No need for cancel function in this version
  };
};

const getHotels = async (cityCode) => {
  try {
    const response = await axios.get(`/api/hotels?cityCode=${cityCode}`);
    const json = response.data;
    console.log("json: ", json.data);

    console.log('Array.isArray(json.data): ', Array.isArray(json.data));
    if (json && Array.isArray(json.data)) {
      
      return json.data;
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};

const getHotelPricing = async (hotelIds, adults) => {
  // console.log('adults: ', adults);
  // console.log('hotelIds: ', hotelIds);
  // console.log("hi");
  try {
    const response = await axios.get(`/api/hotel-offers`, {
      params: {
        hotelIds: hotelIds,
        adults: adults,
      },
    });
    // console.log('Response Status:', response.status);
    // console.log('Response Data:', response.data);
    // console.log("gethotels");
    // console.log('response pricing : ', response);
    const json = response.data;

    if (json /*&& Array.isArray(json.data)*/) {
      console.log("pricing json: ", json);
      return json;
    }
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.warn('Rate limit exceeded. Retrying in 60 seconds...');
      await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 60 seconds
      return getHotelPricing(hotelIds, adults); // Retry the request
    } else {
      console.error('Error fetching hotel pricing:', error);
      throw error; // Re-throw other errors
    }
  }
  return [];
};

const getFlights = async (originLocationCode, destinationLocationCode, departureDate, adults, returnDate, maxPrice ) => {
  try {
    const response = await axios.get(`/api/flight-offers`, {
      params: {
        originLocationCode: originLocationCode,
        departureDate: departureDate,
        destinationLocationCode: destinationLocationCode,
        adults: adults,
        currencyCode: "USD",
        returnDate: returnDate,
        maxPrice: maxPrice,
        
      },
    });
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
    console.log("getflights");
    console.log('flights pricing : ', response);
    const json = response.data;
    console.log("flights json: ", json);

    if (json && json.length > 0) {
      console.log("it runs here!");
      console.log("whats this",json);
      return json;
    }
  } catch (error) {
    console.log("does it ever run here?");
    if (error.response && error.response.status === 429) {
      console.warn('Rate limit exceeded. Retrying in 60 seconds...');
      await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 60 seconds
      return getHotelPricing(hotelIds, adults); // Retry the request
    } else {
      console.error('Error fetching flights pricing:', error);
      throw error; // Re-throw other errors
    }
  }
  return [];
};


export { search, getHotels, getHotelPricing, getFlights };
