import axios from "axios";

const adminAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  // baseURL: "https://production.com/api", // Production URL here
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export default adminAPI;
