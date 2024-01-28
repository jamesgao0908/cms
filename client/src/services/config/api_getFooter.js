import axios from "axios";

const prodBaseUrl = process.env.PROD_BASE_URL;
const api_getFooter = () => {
  return axios
    .get(`${prodBaseUrl}/api/config/footer`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export default api_getFooter;
