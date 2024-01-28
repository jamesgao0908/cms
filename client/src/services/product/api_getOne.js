import axios from "axios";

const prodBaseUrl = process.env.PROD_BASE_URL;
const api_getOne = (data) => {
  const itemData = {};

  // const request1 = axios.get(`http://localhost:8080/api/product/${data}`);
  // const request2 = axios.get(`http://localhost:8080/api/product/${data}/image`);

  const request1 = axios.get(`${prodBaseUrl}/api/product/${data}`);
  const request2 = axios.get(`${prodBaseUrl}/api/product/${data}/image`);

  return axios.all([request1, request2])
    .then(axios.spread((...responses) => {
      itemData.info = responses[0].data;
      itemData.imgs = responses[1].data;
      return itemData;
    }))
    .catch((errors) => {
      throw errors; // Handle errors if needed
    });
};

export default api_getOne;
