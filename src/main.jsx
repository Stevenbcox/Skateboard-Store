import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./pages/Navbar";
import Register from "./pages/Register";
import User from "./pages/User"; // Login page
import AdminLogin from "./pages/AdminLogin"; // Admin Login page
import AdminDashboard from "./pages/AdminDashboard"; // Admin Dashboard page
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Skateboards from "./pages/Skateboards"; // Import Skateboards component


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/skateboards" element={<Skateboards />} />
        <Route path="/login" element={<User />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
