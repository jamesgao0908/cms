import axios from "axios";

const prodBaseUrl = process.env.PROD_BASE_URL;
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
