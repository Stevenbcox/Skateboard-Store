import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styling/singleSkateboard.css"; // Assuming you have a CSS file for styling

const SingleSkateboard = () => {
  const { id } = useParams(); // Get the skateboard ID from the URL
  const [skateboard, setSkateboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkateboard = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/skateboards/${id}`
        );
        setSkateboard(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch skateboard details.");
      }
    };

    fetchSkateboard();
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!skateboard) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="navbar"> {/* Navbar remains unchanged */}</div>
      <main className="main-container">
        <div className="single-skateboard-container">
          <div className="single-skateboard-card"> {/* Add this wrapper */}
            <img
              src={skateboard.image_url || "https://via.placeholder.com/300x300"}
              alt={skateboard.name || "Skateboard"}
              className="skateboard-image"
            />
            <div className="single-skateboard-description"> {/* Wrap details in this div */}
              <h1>{skateboard.brand || "Unknown Skateboard"}</h1>
              <p>
                <strong>type:</strong> {skateboard.name || "N/A"}
              </p>
              <p>
                <strong>Size:</strong> {skateboard.size || "N/A"}
              </p>
              <p>
                <strong>Price:</strong> ${Number(skateboard.price || 0).toFixed(2)}
              </p>
              <p>
                <strong>Stock:</strong> {skateboard.stock || "N/A"}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {skateboard.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SingleSkateboard;
