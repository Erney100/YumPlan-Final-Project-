// Imports Express so we can create backend routes
const express = require("express");

// Creates a router for authentication routes
const router = express.Router();

// Imports bcrypt so we can hash passwords
// Hashing makes passwords safer because we do not store plain text passwords
const bcrypt = require("bcrypt");

// Imports JSON Web Token
// JWT helps us create a login token after the user successfully logs in
const jwt = require("jsonwebtoken");

// Imports the PostgreSQL connection from db.js
const pool = require("../db");



/* =========================
   REGISTER ROUTE
   ========================= */

// This route creates a new user account
// URL: /api/auth/register
router.post("/register", async (req, res) => {
  try {
    // Gets user information from the frontend register form
    const { username, email, password } = req.body;

    // Makes sure all fields are filled in
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    // Checks if an account already exists with this email
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // Stops duplicate accounts from using the same email
    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "Email already exists"
      });
    }

    // Hashes the password before saving it
    // The number 10 is the salt rounds, which controls how strong the hashing is
    const hashedPassword = await bcrypt.hash(password, 10);

    // Saves the new user into the users table
    // RETURNING gives us the new user's basic info back
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );

    // Sends success response back to frontend
    res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0],
    });

  } catch (error) {
    console.error("Register error:", error);

    // Sends error response if something goes wrong
    res.status(500).json({
      error: "Server error during registration"
    });
  }
});



/* =========================
   LOGIN ROUTE
   ========================= */

// This route logs in an existing user
// URL: /api/auth/login
router.post("/login", async (req, res) => {
  try {
    // Gets login information from frontend login form
    const { email, password } = req.body;

    // Makes sure email and password were entered
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    // Looks for the user in the database by email
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // If no user is found, login fails
    if (userResult.rows.length === 0) {
      return res.status(400).json({
        error: "Invalid email or password"
      });
    }

    // Saves the found user row into a variable
    const user = userResult.rows[0];

    // Compares the typed password with the hashed password in the database
    const validPassword = await bcrypt.compare(password, user.password);

    // If the password does not match, login fails
    if (!validPassword) {
      return res.status(400).json({
        error: "Invalid email or password"
      });
    }

    // Creates a login token for the user
    // This token proves the user successfully logged in
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Sends token and safe user information back to frontend
    // Notice we do NOT send the password back
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    // Sends server error if login process fails
    res.status(500).json({
      error: "Server error during login"
    });
  }
});



// Exports router so server.js can use these auth routes
module.exports = router;