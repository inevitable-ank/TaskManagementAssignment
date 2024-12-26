import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); 
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Show Header/Navbar only for authenticated users */}
        {isAuthenticated && (
          <header className="bg-gradient-to-r from-purple-500 to-indigo-700 shadow-lg text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
              {/* Left Section - Logo and Branding */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-10 h-10 text-indigo-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 6a6 6 0 116 6 6.006 6.006 0 01-6-6zm5.25 11.25v.75a2.25 2.25 0 01-4.5 0v-.75m4.5 0v.75m0-1.5h4.5a1.5 1.5 0 001.5-1.5v-9a1.5 1.5 0 00-1.5-1.5h-15A1.5 1.5 0 001 5.25v9a1.5 1.5 0 001.5 1.5h4.5m0-1.5h.008v.008H10.5v-.008z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    Task<span className="text-yellow-300">Manager</span>
                  </h1>
                  <p className="text-sm italic text-gray-200">
                    Stay organized. Stay productive.
                  </p>
                </div>
              </div>

              {/* Right Section - Logout */}
              <button
                onClick={handleLogout}
                className="mt-4 md:mt-0 bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>
          </header>
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
