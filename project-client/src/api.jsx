import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
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
    if (error.response && error.response.status === 429) {
      console.warn('Rate limit exceeded. Retrying in 60 seconds...');
      await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 60 seconds
      return getHotelPricing(hotelIds, adults); // Retry the request
    } else {
      const errorMessage =
      
      error.response?.data?.description?.[0]?.title || 'An error occurred while fetching hotel pricing';
      console.log('errorMessage123: ', errorMessage);
      throw new Error(errorMessage);
    }
  }
  return [];
};

const getHotelPricing = async (hotelIds, adults, checkInDate, checkOutDate) => {
  console.log('checkOutDate: ', checkOutDate);
  console.log('checkInDate: ', checkInDate);
  try {
    const response = await axios.get(`/api/hotel-offers`, {
      params: {
        hotelIds: hotelIds,
        adults: adults,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      },
    });
    
    const json = response.data;
    console.log('json: ', json);

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
      console.log(error, "error");
      const errorCode = error.response?.data?.description?.[0]?.code;
      const errorTitle = error.response?.data?.description?.[0]?.title;
      const errorDetail = error.response?.data?.description?.[0]?.detail;
      const errorMessage1 = `Error in hotel offers search: ${errorCode} - ${errorTitle}. ${errorDetail || ''}`;
      console.log('errorMessage1: ', errorMessage1);
      const errorMessage =
      error.response?.data?.description?.[0]?.title || 'An error occurred while fetching hotel pricing';
      console.log('errorMessage: ', errorMessage);
      throw new Error(errorMessage);
    }
  }
  return [];
};

const getFlights = async (originLocationCode, destinationLocationCode, departureDate, adults, returnDate, maxPrice ) => {
  console.log('originLocationCode, destinationLocationCode, departureDate, adults, returnDate, maxPrice : ', originLocationCode, destinationLocationCode, departureDate, adults, returnDate, maxPrice );
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
    const json = response.data;
    console.log('json: ', json);

    if (json && json.length > 0) {
      return json;
    }
  } catch (error) {
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

const getEvents = async (city,startDateTime,endDateTime ) => {
  console.log('city,startDateTime,endDateTime: ', city,startDateTime,endDateTime);
  try {
    const response = await axios.get(`/api/events`, {
      params: {
        city: city,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
      },
    });
    console.log('response events:', response);
    const json = response.data;
    console.log('json events: ', json);

    if (json && json.length > 0) {
      return json;
    }
  } catch(error) {
    console.error('Error fetching events pricing:', error);
    throw error; // Re-throw other errors
  }
  return [];
}
export { search, getHotels, getHotelPricing, getFlights, getEvents };
