// Imports Link so users can navigate between pages
// without refreshing the entire app
import { Link } from "react-router-dom";

// Imports useState so we can control the logout dropdown menu
import { useState } from "react";

function Navbar() {

  // Gets logged-in user information from localStorage
  // This allows the navbar to know whether someone is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  // Controls whether logout menu is visible
  const [showMenu, setShowMenu] = useState(false);


  // Logs user out
  function handleLogout() {

    // Removes saved login token
    localStorage.removeItem("token");

    // Removes saved user information
    localStorage.removeItem("user");

    // Lets user know logout worked
    alert("Logged out successfully!");

    // Sends them back to homepage
    window.location.href = "/";
  }

  return (
    <nav>

      {/* Website logo/title */}
      <h2>YumPlan</h2>

      <div className="nav-links">

        {/* Navigation links */}
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-recipe">Add Recipe</Link>

        {/* If user is NOT logged in */}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (

          // If user IS logged in
          <div className="profile-section">

            {/* Shows username */}
            <span className="welcome-text">
              Hi, {user.username}
            </span>

            {/* Profile icon button */}
            <button
              className="profile-btn"

              // Opens/closes logout menu
              onClick={() => setShowMenu(!showMenu)}
            >
              👤
            </button>

            {/* Only show logout menu if showMenu is true */}
            {showMenu && (
              <div className="logout-menu">

                <p>Logout?</p>

                <button onClick={handleLogout}>
                  Logout
                </button>

              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

// Allows navbar to be used in App.jsx
export default Navbar;

