const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/smartAQI")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
