import Axios from "axios";

const Services = Axios.create({
  baseURL: "http://localhost:8000/api",
});

// Services.interceptors.request.use((config) => {
//   const token = "Bearer " + sessionStorage.getItem("token");

//   config.headers = {
//     Authorization: token,
//     "Content-Type": "application/json",
//   };

//   return config;
// });

export default Services;
