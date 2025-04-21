import React, { useEffect, useState } from "react";
import axios from "axios";

const Skateboards = () => {
  const [skateboards, setSkateboards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkateboards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/skateboards"
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
              src={skateboard.image_url}
              alt={skateboard.name}
              className="skateboard-image"
            />
            <h2>{skateboard.name}</h2>
            <p>Brand: {skateboard.brand}</p>
            <p>Size: {skateboard.size}</p>
            <p>Price: ${Number(skateboard.price || 0).toFixed(2)}</p>
            <p>Stock: {skateboard.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skateboards;
