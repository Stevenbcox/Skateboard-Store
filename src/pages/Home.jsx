import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";

const Home = () => {
  const [featuredSkateboards, setFeaturedSkateboards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedSkateboards = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/skateboards`);
        setFeaturedSkateboards(response.data.slice(0, 3)); // Limit to 3 featured skateboards
      } catch (err) {
        console.error("Error fetching skateboards:", err);
        setError("Failed to load featured skateboards.");
      }
    };

    fetchFeaturedSkateboards();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Steven's Skateboards</h1>
        <p>Your one-stop shop for all your skateboarding needs!</p>
        <p>
          At Steven's Skateboards, we are passionate about providing
          high-quality skateboards for skaters of all levels. Whether you're a
          beginner looking for your first board or a seasoned pro searching for
          the perfect deck, we've got you covered. Explore our wide range of
          skateboards, accessories, and gear to take your skating to the next
          level. Join our community of skaters and experience the thrill of the
          ride!
        </p>
        <Link to="/skateboards" className="cta-button">
          Shop Now
        </Link>
      </div>
      <div className="featured-section">
        <h2>Featured Skateboards</h2>
        {error && <p className="error">{error}</p>}
        <div className="featured-list">
          {featuredSkateboards.map((skateboard) => (
            <Link
              to={`/skateboards/${skateboard.id}`} // Route to SingleSkateboard page
              key={skateboard.id}
              className="featured-card"
            >
              <img
                src={skateboard.image_url}
                alt={skateboard.name}
                className="featured-image"
              />
              <h3>{skateboard.name}</h3>
              <p>${Number(skateboard.price || 0).toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
      <footer className="footer">
        <p>
          This website is created for learning purposes as part of a capstone
          project.
          <Link to="/admin" className="admin-link">
            Admin Login
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Home;
