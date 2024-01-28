import axios from "axios";
const prodBaseUrl = "http://13.210.72.134:8080";
console.log(`${prodBaseUrl}/api/config/header`);
const api_getHeader = () => {
  console.log(`${prodBaseUrl}/api/config/header`);
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
