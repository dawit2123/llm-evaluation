import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-gradient-to-b from-indigo-100 to-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-indigo-600 mb-6">
            Welcome to AI Metrics Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Effortlessly evaluate AI responses and track performance metrics for
            your prompts.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg shadow-md hover:bg-indigo-700"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-100 text-indigo-600 px-6 py-3 rounded-md text-lg shadow-md hover:bg-gray-200"
            >
              Login
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              Analyze Prompts
            </h2>
            <p className="text-gray-600">
              Submit your AI prompts and evaluate responses from cutting-edge
              models like Gemini, Llama, and Mixtral.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              Track Metrics
            </h2>
            <p className="text-gray-600">
              Visualize metrics such as accuracy, relevancy, and coherence to
              refine your AI workflows.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              Save & Retrieve
            </h2>
            <p className="text-gray-600">
              Store your prompts and responses securely for future analysis and
              decision-making.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
