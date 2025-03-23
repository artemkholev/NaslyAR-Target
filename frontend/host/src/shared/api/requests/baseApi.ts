import axios from "axios";

import { setToken, getToken, removeToken } from "@/shared/lib/auth";

const baseURL = process.env.VITE_API_URL;

const baseApi = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 10000
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((promise: any) => {
    token ? promise.resolve(token) : promise.reject(error);
  });
  failedQueue = [];
};

baseApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return baseApi(originalRequest);
        });
      }
      isRefreshing = true;
      try {
        const { data } = await baseApi.post("/auth/refresh");
        setToken(data.accessToken);
        baseApi.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return baseApi(originalRequest);
      } catch (err) {
        processQueue(err, null);
        removeToken();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default baseApi;
