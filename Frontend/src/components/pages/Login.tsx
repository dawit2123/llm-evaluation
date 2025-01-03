import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../hooks/MyProvider";

const Login: React.FC = () => {
  const { setUser } = useContext(MyContext); // Access the context to update user data
  const navigate = useNavigate();

  // State for form inputs and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch(import.meta.env.VITE_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Incorrect email or password");
      }

      const data = await response.json();
      const { token, user } = data;

      // Update context with user email and validation status
      setUser({
        email: user.email,
        isValidated: true,
      });

      // Save token in localStorage (optional)
      localStorage.setItem("token", token);

      // Redirect to the /metrics page
      navigate("/metrics");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h1>
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
