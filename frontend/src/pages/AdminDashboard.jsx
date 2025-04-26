import React, { useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [newSkateboard, setNewSkateboard] = useState({
    name: "",
    brand: "",
    size: "",
    price: "",
    stock: "",
    image_url: "",
    description: "",
  });
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");

  // Handle input changes for creating a skateboard
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkateboard({ ...newSkateboard, [name]: value });
  };

  const handleCreateSkateboard = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://skateboard-store-2.onrender.com/api/skateboards`,
        newSkateboard
      );
      setMessage("Skateboard created successfully!");
      setNewSkateboard({
        name: "",
        brand: "",
        size: "",
        price: "",
        stock: "",
        image_url: "",
        description: "",
      });
    } catch (err) {
      console.error("Error creating skateboard:", err);
      setMessage("Failed to create skateboard.");
    }
  };

  const handleDeleteSkateboard = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `https://skateboard-store-2.onrender.com/api/skateboards/${deleteId}`
      );
      setMessage("Skateboard deleted successfully!");
      setDeleteId("");
    } catch (err) {
      console.error("Error deleting skateboard:", err);
      setMessage("Failed to delete skateboard.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Welcome to the Admin Dashboard!</h1>
      {message && <p className="message">{message}</p>}

      {/* Create Skateboard Form */}
      <div className="create-skateboard">
        <h2>Create a New Skateboard</h2>
        <form onSubmit={handleCreateSkateboard}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newSkateboard.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={newSkateboard.brand}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="size"
            placeholder="Size (e.g., 8.0\"
            value={newSkateboard.size}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newSkateboard.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newSkateboard.stock}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={newSkateboard.image_url}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newSkateboard.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">Create Skateboard</button>
        </form>
      </div>

      {/* Delete Skateboard Form */}
      <div className="delete-skateboard">
        <h2>Delete a Skateboard</h2>
        <form onSubmit={handleDeleteSkateboard}>
          <input
            type="text"
            placeholder="Enter Skateboard ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            required
          />
          <button type="submit">Delete Skateboard</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
