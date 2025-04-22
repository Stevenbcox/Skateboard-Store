import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Skateboards from "./pages/Skateboards";
import SingleSkateboard from "./pages/SingleSkateboard";
import Login from "./pages/login";
import Register from "./pages/Register";
import Account from "./pages/Account";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skateboards" element={<Skateboards />} />
        <Route path="/skateboards/:id" element={<SingleSkateboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
