import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./pages/Navbar";
import User from "./pages/User"; // Login/Register page
import AdminDashboard from "./pages/AdminDashboard"; // Admin Dashboard page

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<User />} />
        <Route path="/register" element={<User />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById("root")).render(<App />);
