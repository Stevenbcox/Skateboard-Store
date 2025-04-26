import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Skateboards = () => {
  const [skateboards, setSkateboards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkateboards = async () => {
      try {
        const response = await axios.get(
          `https://skateboard-store-2.onrender.com/api/skateboards`
        );
        setSkateboards(response.data);
      } catch (err) {
        setError("Failed to fetch skateboards");
        console.error(err);
      }
    };

    fetchSkateboards();
  }, []);

  return (
    <div className="skateboards-container">
      <h1>Available Skateboards</h1>
      {error && <p className="error">{error}</p>}
      <div className="skateboards-list">
        {skateboards.map((skateboard) => (
          <div key={skateboard.id} className="skateboard-card">
            <img
              src={
                skateboard.image_url || "https://via.placeholder.com/300x200"
              }
              alt={skateboard.name}
              className="skateboard-image"
            />
            <h2>{skateboard.brand}</h2>
            <p>Price: ${Number(skateboard.price || 0).toFixed(2)}</p>
            <Link to={`/skateboards/${skateboard.id}`} className="view-details">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skateboards;
