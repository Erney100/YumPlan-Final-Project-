// Imports the Express framework so we can build our backend server
const express = require("express");

// Allows our frontend (React app) to communicate with our backend
// Without this, the browser may block requests because of CORS restrictions
const cors = require("cors");

// Loads environment variables from our .env file
// This keeps sensitive information like database URLs secure
require("dotenv").config();


// Import route files
// These keep our code organized instead of putting everything in one file

// Handles user registration and login routes
const authRoutes = require("./routes/authRoutes");

// Handles CRUD operations for recipes
const recipeRoutes = require("./routes/recipeRoutes");

// Handles grocery list routes
const groceryRoutes = require("./routes/groceryRoutes");


// Creates our Express app
const app = express();


// Middleware

// Allows frontend requests from another port (React runs on port 5173)
app.use(cors());

// Allows our backend to read JSON data sent from forms
// Example: recipe title, ingredients, login info
app.use(express.json());


// Route middleware

// All authentication routes start with /api/auth
// Example:
// POST /api/auth/register
// POST /api/auth/login
app.use("/api/auth", authRoutes);

// All recipe routes start with /api/recipes
// Example:
// GET /api/recipes
// POST /api/recipes
// PUT /api/recipes/:id
// DELETE /api/recipes/:id
app.use("/api/recipes", recipeRoutes);

// All grocery routes start with /api/grocery
app.use("/api/grocery", groceryRoutes);


// Basic test route
// This helps us verify that the backend server is working
app.get("/", (req, res) => {
  res.send("Recipe & Grocery Planner API is running");
});


// Uses the port from Render/.env when deployed
// If no port is provided, it uses port 5000 locally
const PORT = process.env.PORT || 5000;


// Starts the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});