// server.js

const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Test Route
app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is working perfectly 🚀",
  });
});

// Root Route (optional)
app.get("/", (req, res) => {
  res.send("Welcome to the basic Node server!");
});

// Server Listener
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});