import axios from "axios";

const api_getIns = () => {
  return axios
    .get("http://localhost:8080/api/product/ins")
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export default api_getIns;
