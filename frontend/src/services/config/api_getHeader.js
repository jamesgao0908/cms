import axios from "axios";

const api_getHeader = () => {
  return axios
    .get("http://localhost:8080/api/config/header")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export default api_getHeader;
