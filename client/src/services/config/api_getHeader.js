import axios from "axios";
const prodBaseUrl = process.env.PROD_BASE_URL;
const api_getHeader = () => {
  return axios
    // .get("http://localhost:8080/api/config/header")
    .get(`${prodBaseUrl}/api/config/header`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export default api_getHeader;
