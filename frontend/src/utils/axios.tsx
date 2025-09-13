import axios from "axios";
import { backendUrl } from "./config";

const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to attach tokens if needed
axiosInstance.interceptors.request.use((config) => {
  // If needed, you can attach headers here
  return config;
});

// Response interceptor to handle 401 and refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh token API
        await axiosInstance.post("/auth/refresh");
        const headers = { ...originalRequest.headers };
        // Retry the original request
        return axiosInstance.request({ ...originalRequest, headers });
      } catch (refreshError) {
        // If refresh fails, logout user or handle accordingly
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
