import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://quanvaulte-be.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
