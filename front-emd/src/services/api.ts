import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.88.87:5000/api/",
  
});

export default api;
