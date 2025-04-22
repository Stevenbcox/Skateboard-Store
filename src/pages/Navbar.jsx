import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // Import global styles if needed

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Steven's Skateboards</h1>
      <div className="nav-buttons">
        <Link to="/" className="nav-button">
          Home
        </Link>
        <Link to="/skateboards" className="nav-button">
          Skateboards
        </Link>
        {token ? (
          <>
            <Link to="/account" className="nav-button">
              Account
            </Link>
            <button onClick={handleLogout} className="nav-button logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button">
              Login
            </Link>
            <Link to="/register" className="nav-button">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
