import axios from 'axios';

const api_getFooter = () => {
  return axios
      .get('http://localhost:8080/api/config/footer')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
};

export default api_getFooter;
