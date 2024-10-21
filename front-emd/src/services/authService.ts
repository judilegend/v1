// const API_URL = "http://192.168.88.87:3000/api/auth"
// const API_URL = "http://localhost:5000/api/auth";

// export const register = async (
//   username: string,
//   email: string,
//   role: string,
//   password: string
// ) => {
//   const response = await fetch(`${API_URL}/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, email, role, password }),
//   });
//   return response.json();
// };

// export const login = async (email: string, password: string) => {
//   const response = await fetch(`${API_URL}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   return response.json();
// };
import axios from "axios";

// const API_URL = "http://192.168.88.87:5000/api/auth";
const API_URL = "http://localhost:5000/api/auth";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const logout = async () => {
  // If you have a logout endpoint on your server, you can call it here
  // await axios.post(`${API_URL}/logout`);
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
