import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post(
        "https://skateboard-store-2.onrender.com/auth/login",
        credentials
      );
      setMessage("Login successful!");
      console.log("Login successful:", response.data);
      // Save the token to localStorage or state
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      setMessage("Error logging in. Please check your credentials.");
      console.error("Error logging in user:", err.response?.data || err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
