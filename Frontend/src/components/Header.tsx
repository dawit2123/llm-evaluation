import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">
          <Link to="/">AI Metrics Dashboard</Link>
        </h1>
        <nav className="flex space-x-4">
          <Link
            to="/login"
            className="text-lg bg-white text-indigo-600 px-4 py-2 rounded-md shadow hover:bg-gray-100 hover:underline"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-lg bg-white text-indigo-600 px-4 py-2 rounded-md shadow hover:bg-gray-100"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
