import axios from "axios";

const piczApi = axios.create({ baseURL: process.env.REACT_APP_API_URL });

piczApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});

export default piczApi;
