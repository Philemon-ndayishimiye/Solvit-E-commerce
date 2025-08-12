import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com/",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, image/*",
  },
});

export default api;
