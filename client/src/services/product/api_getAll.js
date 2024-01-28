import axios from "axios";

const prodBaseUrl = "http://13.210.72.134:8080";
const api_getAll = () => {
  console.log(`${prodBaseUrl}/api/product/getall`);
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
