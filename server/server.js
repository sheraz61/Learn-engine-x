const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Mongo URL from docker-compose
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/testdb";

// Middleware
app.use(express.json());

// --------------------
// MongoDB Connection
// --------------------
mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

// --------------------
// User Schema & Model
// --------------------
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

// --------------------
// Test Route
// --------------------
app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is working perfectly 🚀",
  });
});

// --------------------
// 1. Add User (Hardcoded)
// --------------------
app.get("/add-user", async (req, res) => {
  try {
    const user = new User({
      name: "Sheraz Hussain",
      email: "sheraz@test.com",
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding user",
      error: error.message,
    });
  }
});

// --------------------
// 2. Get All Users
// --------------------
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// --------------------
// Root Route
// --------------------
app.get("/", (req, res) => {
  res.send("Welcome to the basic Node server!");
});

// --------------------
// Server Listener
// --------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});