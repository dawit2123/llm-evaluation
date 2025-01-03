import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../hooks/MyProvider";

const Header: React.FC = () => {
  const { user, setUser } = useContext(MyContext); // Access user and setUser from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a GET request to the logout endpoint using fetch
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token
        },
      });

      if (response.ok) {
        // Clear user data and token on successful logout
        setUser({ email: "", isValidated: false });
        localStorage.removeItem("token");
        navigate("/"); // Redirect to the home page
      } else {
        console.error("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">
          <Link to="/">AI Metrics Dashboard</Link>
        </h1>
        <nav className="flex space-x-4">
          {user.isValidated ? (
            <>
              <Link
                to="/metrics"
                className="text-lg bg-white text-indigo-600 px-4 py-2 rounded-md shadow hover:bg-gray-100"
              >
                Metrics
              </Link>
              <Link
                to="/analytics"
                className="text-lg bg-white text-indigo-600 px-4 py-2 rounded-md shadow hover:bg-gray-100"
              >
                Analytics
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg bg-white text-indigo-600 px-4 py-2 rounded-md shadow hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-lg bg-white text-indigo-600 px-4 py-2 rounded-md shadow hover:bg-gray-100"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
