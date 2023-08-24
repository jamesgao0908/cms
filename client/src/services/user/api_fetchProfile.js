import axios from "axios";

const api_fetchProfile = () => {
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
        resolve(response.data); // 将结果通过 resolve 返回
      })
      .catch(error => {
        reject(error); // 将错误通过 reject 返回
      });
  });
};

export default api_fetchProfile;
