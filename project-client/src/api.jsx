import axios from "axios";

axios.defaults.baseURL = "https://getawayguide123.onrender.com/";
const search = (input) => {
  if (input) {
    try {
      const request = axios.get(`/api/search?keyword=${input}`);
      return {
        async process(callback) {
          request.then((response) => {
            const json = response.data;

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
    console.log("json: ", json);

    if (json && Array.isArray(json.data)) {
      return json.data;
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};

const getHotelPricing = async (hotelId, adults) => {
  try {
    const response = await axios.get(`/api/hotel-offers?hotelIds=${hotelId}&adults=${adults}`);
    const json = response.data;
    console.log("pricing json: ", json);

    if (json && Array.isArray(json.data)) {
      return json.data;
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};

export { search, getHotels, getHotelPricing };
