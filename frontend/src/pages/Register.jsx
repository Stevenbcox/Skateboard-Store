import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "https://skateboard-store-2.onrender.com/auth/register",
        userData
      );
      setMessage("Registration successful!");
      console.log("Registration successful:", response.data);
    } catch (err) {
      setMessage("Error registering user. Please try again.");
      console.error("Error registering user:", err.response?.data || err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Register</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
