import React, { useState } from "react";
import axios from "axios";

const User = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      setMessage(response.data.message);
      console.log("Token:", response.data.token); // Save the token for future requests
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="user-container">
      <h1 className="user-title">Login</h1>
      <form onSubmit={handleLogin} className="user-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="user-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="user-input"
        />
        <button type="submit" className="user-button">
          Login
        </button>
      </form>
      {message && <p className="user-message">{message}</p>}
    </div>
  );
};

export default User;
