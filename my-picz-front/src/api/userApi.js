import axios from "axios";

export const userApi = axios.create({
  baseURL: process.env.REACT_APP_USER_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_USER_API_URL,
  //   headers: { "Content-Type": "application/json" },
  //   withCredentials: true,
});
