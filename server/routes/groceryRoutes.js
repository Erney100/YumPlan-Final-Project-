// Imports Express so we can create routes
const express = require("express");

// Creates a router for grocery-related routes
const router = express.Router();



/* =========================
   GET GROCERY LIST
   ========================= */

// This route would eventually fetch grocery items
// from the database for a user's meal plan
router.get("/", (req, res) => {
  res.json({
    message: "Get grocery list route works"
  });
});



/* =========================
   ADD GROCERY ITEM
   ========================= */

// This route would allow users to add grocery items
// based on recipes they choose
router.post("/", (req, res) => {
  res.json({
    message: "Add grocery item route works"
  });
});



// Exports router so server.js can use it
module.exports = router;