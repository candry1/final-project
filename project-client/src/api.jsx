import axios from "axios";

const { CancelToken } = axios;

axios.defaults.baseURL = 'http://localhost:8000';
const search = (input) => {
  if (input) {
    try {
      const source = CancelToken.source();
      var params = new URLSearchParams();
      var req = {
        params: params,
      };
      axios.get(`/api/search?keyword=${input}`, req)
    .then((res) => {
        this.setState({ total: res.data });
    })
    .catch((error) => {
        // here you will have access to error.response
        console.log(error.response)
    });
      const request = axios.get(`/api/search?keyword=${input}`, {
        cancelToken: source.token,
      });
      console.log('request: ', request);
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