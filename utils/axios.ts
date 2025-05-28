import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const api = axios.create({
  baseURL: API_URL,
  // timeout: 10000,
  withCredentials: true,
  
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "خطایی رخ داده است";

    switch (status) {
      case 401:
        window.location.href = "/guest";
        break;
      case 404:
        window.location.href = "/*";
        break;
      default:
        console.error("Unhandled error:", status, message);
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
