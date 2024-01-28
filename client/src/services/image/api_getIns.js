import axios from "axios";

const prodBaseUrl = "http://13.210.72.134:8080";
const api_getIns = () => {
  return axios
    // .get("http://localhost:8080/api/product/ins")
    .get(`${prodBaseUrl}/api/product/ins`)
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export default api_getIns;
