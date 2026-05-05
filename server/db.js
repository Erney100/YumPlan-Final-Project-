// Imports Pool from PostgreSQL package
// Pool helps us create a reusable connection to our database
const { Pool } = require("pg");

// Loads environment variables from our .env file
// This lets us safely access our Neon database connection string
require("dotenv").config();


// Creates a new database connection pool
const pool = new Pool({
  
  // Uses the DATABASE_URL stored in .env
  // This connects our app to Neon PostgreSQL
  connectionString: process.env.DATABASE_URL,
});


// Exports the pool so other files can use it
// Example:
// recipeRoutes.js uses this to save/edit/delete recipes
// authRoutes.js uses this to save/login users
module.exports = pool;