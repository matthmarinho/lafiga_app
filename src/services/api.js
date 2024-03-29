import axios from "axios";
import { getToken } from "./auth";
const api = axios.create({
  baseURL: 'http://api.lafiga.com.br/',
  // baseURL: 'http://127.0.0.1:3000/',
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
