import axios from "axios";

const api_userLogin = (email, password, rememberMe, navigate) => {
  return new Promise((resolve, reject) => {
    const postData = {
      email,
      password,
      rememberMe,
    };
    axios
      .post("http://localhost:8080/api/user/login", postData)
      .then((response) => {
        const { token, is_admin } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          if (is_admin === 1) {
            navigate("/config");
          } else {
            navigate("/");
          }
          resolve("Login successful"); // 解析成功，返回成功信息
        } else {
          reject(new Error("Login failed")); // 登录失败，返回失败信息
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data.message)); // 处理登录错误，返回错误信息
      });
  });
};

export default api_userLogin;
