import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        {isAuthenticated && (
          <nav className="bg-green-500 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4">
              <h1 className="text-2xl font-bold">Task Manager</h1>
              <button
                onClick={handleLogout}
                className="bg-white text-green-500 px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          </nav>
        )}
        {/* Page Content */}
        <Routes>
          {/* Login Page */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          {/* Register Page */}
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register />
              )
            }
          />
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Redirect to Login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
