import axios from "axios";

const prodBaseUrl = "http://localhost:8080";

const api_getProduct = () => {

  return axios
    .get(`${prodBaseUrl}/api/product`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export default api_getProduct;
