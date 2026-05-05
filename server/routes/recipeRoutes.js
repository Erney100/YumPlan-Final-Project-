// Imports Express so we can create routes
const express = require("express");

// Creates a router object
// This helps organize recipe-related routes separately from other files
const router = express.Router();

// Imports our PostgreSQL connection from db.js
// This lets us communicate with Neon database
const pool = require("../db");



/* =========================
   GET ALL RECIPES
   ========================= */

// This route gets every recipe stored in the database
// URL: /api/recipes
router.get("/", async (req, res) => {
  try {
    
    // SQL query:
    // Select all recipes and show newest recipes first
    const result = await pool.query(
      "SELECT * FROM recipes ORDER BY id DESC"
    );

    // Sends recipe data back to frontend
    res.status(200).json(result.rows);

  } catch (error) {
    console.error("Error getting recipes:", error);

    // Sends server error if query fails
    res.status(500).json({
      error: "Server error while getting recipes"
    });
  }
});



/* =========================
   CREATE RECIPE
   ========================= */

// This route saves a new recipe into the database
// URL: /api/recipes
router.post("/", async (req, res) => {
  try {

    // Gets form data sent from frontend
    const { title, ingredients, instructions } = req.body;

    // Makes sure user filled everything out
    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    // Inserts recipe into PostgreSQL database
    const result = await pool.query(
      "INSERT INTO recipes (title, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *",
      [title, ingredients, instructions]
    );

    // Sends newly created recipe back to frontend
    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("Error creating recipe:", error);

    res.status(500).json({
      error: "Server error while creating recipe"
    });
  }
});



/* =========================
   UPDATE RECIPE
   ========================= */

// This route edits an existing recipe
// URL example: /api/recipes/5
router.put("/:id", async (req, res) => {
  try {

    // Gets recipe ID from URL
    const { id } = req.params;

    // Gets updated form data from frontend
    const { title, ingredients, instructions } = req.body;

    // Updates recipe in database
    const result = await pool.query(
      "UPDATE recipes SET title = $1, ingredients = $2, instructions = $3 WHERE id = $4 RETURNING *",
      [title, ingredients, instructions, id]
    );

    // If recipe doesn't exist
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Recipe not found"
      });
    }

    // Sends updated recipe back
    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("Error updating recipe:", error);

    res.status(500).json({
      error: "Server error while updating recipe"
    });
  }
});



/* =========================
   DELETE RECIPE
   ========================= */

// This route removes a recipe from database
// URL example: /api/recipes/5
router.delete("/:id", async (req, res) => {
  try {

    // Gets recipe ID from URL
    const { id } = req.params;

    // Deletes recipe from database
    const result = await pool.query(
      "DELETE FROM recipes WHERE id = $1 RETURNING *",
      [id]
    );

    // If recipe doesn't exist
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Recipe not found"
      });
    }

    // Success message
    res.status(200).json({
      message: "Recipe deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting recipe:", error);

    res.status(500).json({
      error: "Server error while deleting recipe"
    });
  }
});



// Exports router so server.js can use it
module.exports = router;