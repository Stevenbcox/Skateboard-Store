import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";

const Account = () => {
  const [user, setUser] = useState(null); // Store user data
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          navigate("/login"); // Redirect to login if not logged in
          return;
        }

        const response = await axios.get(`${BASE_URL}/auth/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        if (err.response && err.response.status === 404) {
          setMessage("User not found. Please log in again.");
          navigate("/login");
        } else {
          setMessage("An error occurred. Please try again later.");
        }
      }
    };

    fetchUser();
  }, [navigate]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      await axios.put(
        `${BASE_URL}/auth/account/password`,
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Password updated successfully!");
      setNewPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      setMessage("Failed to update password.");
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Show a loading message while fetching user data
  }

  return (
    <div className="account-container">
      <h1>Account Page</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <form onSubmit={handlePasswordChange} className="password-form">
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Account;
