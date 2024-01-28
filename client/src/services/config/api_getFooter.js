import axios from "axios";

const prodBaseUrl = "http://13.210.72.134:8080";
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
