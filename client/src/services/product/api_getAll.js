import axios from 'axios';

const api_getAll = () => {
  return axios
      .get('http://localhost:8080/api/product/getall')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
};

export default api_getAll;
