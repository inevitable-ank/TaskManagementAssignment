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
  baseURL: "http://localhost:5000/api", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization token to headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User Authentication APIs
export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  if (response.data.token) {
    localStorage.setItem("authToken", response.data.token);
  }
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
};

// Task Management APIs
export const getTasks = async () => {
  const response = await API.get("/tasks");
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
  const response = await API.delete(`/tasks/${taskId}`);
  return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await API.patch(`/tasks/${taskId}/status`, { status });
  return response.data;
};

// Priority Management APIs
export const moveTaskToPriority = async (taskId, priority) => {
  const response = await API.patch(`/tasks/${taskId}/priority`, { priority });
  return response.data;
};

// Fetch Task Details
export const getTaskDetails = async (taskId) => {
  const response = await API.get(`/tasks/${taskId}`);
  return response.data;
};

export default API;
