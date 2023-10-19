import axios from "axios";

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
        cancel() {
          source.cancel();
        },
      };
    } catch (error) {
      console.error(error);
    }
  }
  return {
    process() {
      return [];
    },
    cancel() {},
  };
};

export { search }
