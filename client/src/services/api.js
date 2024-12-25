// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5000/api';
// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axios;

// src/services/api.js
import axios from "axios";

// Base configuration for Axios
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update with backend URL if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization token to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  if (response.data.token) {
    localStorage.setItem("authToken", response.data.token); // Save token
  }
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// Task APIs
export const getTasks = async (page = 1, limit = 5) => {
  const response = await API.get(`/tasks?page=${page}&limit=${limit}`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await API.post("/tasks", taskData);
  return response.data;
};

export const updateTask = async (taskId, updatedData) => {
  const response = await API.put(`/tasks/${taskId}`, updatedData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  console.log("API Delete Task ID:", taskId);  
  const response = await API.delete(`/tasks/${taskId}`);
  console.log(response.data)
  return response.data;
};

export default API;

