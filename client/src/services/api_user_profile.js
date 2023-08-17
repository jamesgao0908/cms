import axios from "axios";

const api_user_profile = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080/api/',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    axiosInstance.get('/user/profile')
      .then(response => { 
        // console.log(response.data);
        resolve(response.data); // 将结果通过 resolve 返回
      })
      .catch(error => {
        console.error(error);
        reject(error); // 将错误通过 reject 返回
      });
  });
};

export default api_user_profile;
