import axios from "axios";

axios.defaults.baseURL = 'https://getawayguide123.onrender.com/';
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
                })
              );
            }
          });
        },
        // No need for cancel function in this version
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request was canceled', error.message);
      } else {
        console.error('Request failed:', error);
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

export { search };
