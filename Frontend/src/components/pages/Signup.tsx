import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../hooks/MyProvider";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setUser } = useContext(MyContext); // Access the context to update user data

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Reset any previous error messages

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Request body for the registration API
    const requestBody = {
      email,
      password,
    };

    try {
      // Make the POST request to the registration API
      const response = await fetch(import.meta.env.VITE_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully registered
        // Optionally store the user's email and ID in local storage or context
        // Update context with user email and validation status
        setUser({
          email: data.email,
          isValidated: true,
        });

        // Save token in localStorage (optional)
        localStorage.setItem("token", data.token);

        // Redirect to the /metrics page after successful registration
        navigate("/metrics");
      } else {
        // If registration failed, display an error message
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-600 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Confirm your password"
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
