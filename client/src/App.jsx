// Import BrowserRouter, Routes, and Route from react-router-dom
// These allow your app to have multiple pages without reloading the website.
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Imports your CSS styling file for the entire App
import "./App.css";


// Importing the Navbar component
// This navigation bar will appear at the top of every page
import Navbar from "./components/Navbar";


// Importing all page components
// Each file represents a different screen/page in your app
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddRecipe from "./pages/AddRecipe";


// Main App function component
// This is the root component that runs your entire application
function App() {

  // return tells React what should be displayed on the screen
  return (

    // BrowserRouter wraps the entire app
    // It enables routing so users can move between pages
    // Example:
    // localhost:3000/login
    // localhost:3000/register
    // localhost:3000/dashboard
    <BrowserRouter>

      {/* Navbar is placed here so it shows on ALL pages */}
      {/* If you placed it inside one route, it would only show on that specific page */}
      <Navbar />



      {/* Routes container holds all individual page routes */}
      <Routes>

        {/* Home page route */}
        {/* When user visits "/" it loads Home.jsx */}
        {/* Example URL: localhost:3000/ */}
        <Route path="/" element={<Home />} />


        {/* Login page route */}
        {/* Loads Login.jsx */}
        {/* Example URL: localhost:3000/login */}
        <Route path="/login" element={<Login />} />


        {/* Register page route */}
        {/* Loads Register.jsx */}
        {/* Example URL: localhost:3000/register */}
        <Route path="/register" element={<Register />} />


        {/* Dashboard route */}
        {/* This page usually shows saved recipes, meal plans, or user info */}
        {/* Example URL: localhost:3000/dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />


        {/* Add Recipe route */}
        {/* This page allows users to create and submit new recipes */}
        {/* Example URL: localhost:3000/add-recipe */}
        <Route path="/add-recipe" element={<AddRecipe />} />

      </Routes>

    </BrowserRouter>
  );
}


// Exports App so it can be used in main.jsx/index.js
export default App;