import axios from "axios";

const prodBaseUrl = process.env.PROD_BASE_URL;
const api_userLogout = () => {
  // console.log("called logout");
  return new Promise((resolve, reject) => {
    axios
      // .post("http://localhost:8080/api/user/logout")
      .post(`${prodBaseUrl}/api/user/logout`)
      .then((response) => {
        localStorage.removeItem("token");
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error.response.data.message)); // 处理登录错误，返回错误信息
      });
  });
};

export default api_userLogout;
