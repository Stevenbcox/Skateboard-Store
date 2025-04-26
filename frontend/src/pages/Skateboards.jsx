import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Skateboards = () => {
  const [skateboards, setSkateboards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkateboards = async () => {
      try {
        // Fetch skateboards from the API
        const response = await axios.get(
          `https://skateboard-store-2.onrender.com/api/skateboards`
        );
        setSkateboards(response.data); // Set the skateboards data
      } catch (err) {
        setError("Failed to fetch skateboards. Please try again later.");
        console.error("Error fetching skateboards:", err);
      }
    };

    fetchSkateboards();
  }, []);

  return (
    <div className="skateboards-container">
      <h1>Available Skateboards</h1>
      {error && <p className="error">{error}</p>}
      <div className="skateboards-list">
        {skateboards.length > 0 ? (
          skateboards.map((skateboard) => (
            <div key={skateboard.id} className="skateboard-card">
              <img
                src={
                  skateboard.image_url || "https://via.placeholder.com/300x200"
                }
                alt={skateboard.name}
                className="skateboard-image"
              />
              <h2>{skateboard.name}</h2>
              <p>Brand: {skateboard.brand}</p>
              <p>Price: ${Number(skateboard.price || 0).toFixed(2)}</p>
              <Link
                to={`/skateboards/${skateboard.id}`}
                className="view-details"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          !error && <p>Loading skateboards...</p>
        )}
      </div>
    </div>
  );
};

export default Skateboards;
