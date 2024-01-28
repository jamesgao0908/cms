import axios from "axios";

const prodBaseUrl = process.env.PROD_BASE_URL;
const api_getAll = () => {
  return axios
    // .get("http://localhost:8080/api/product/getall")
    .get(`${prodBaseUrl}/api/product/getall`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export default api_getAll;
