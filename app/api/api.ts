import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
//   withCredentials: true,
// });

export const api = axios.create({
  baseURL: "https://note-app-backend-python-production.up.railway.app/api/",
  withCredentials: true,
});