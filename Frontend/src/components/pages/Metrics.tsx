import React, { useState, useContext } from "react";
import { MyContext } from "../../hooks/MyProvider";

const Metrics: React.FC = () => {
  const { user } = useContext(MyContext);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  interface ResponseData {
    geminiResponse: {
      response: string;
      accuracy: number;
      relevancy: number;
      coherence: number;
      completion: number;
      timeTaken: number;
    };
    llamaResponse: {
      response: string;
      accuracy: number;
      relevancy: number;
      coherence: number;
      completion: number;
      timeTaken: number;
    };
    mixtralResponse: {
      response: string;
      accuracy: number;
      relevancy: number;
      coherence: number;
      completion: number;
      timeTaken: number;
    };
  }

  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (user.isValidated === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-800">
          Please log in to access this page.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Reset previous error message
    setResponseData(null); // Clear previous response data
    setIsLoading(true); // Show loader

    const requestBody = { prompt };

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Set up the headers with Authorization if token exists
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`; // Attach the Bearer token
      }

      const response = await fetch(import.meta.env.VITE_PROMPT_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseData(data.data);
      } else {
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error during request:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div className="min-h-screen pb-10 flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-500">
      <div
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-screen-lg"
        style={{ width: "95%" }}
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Welcome to AI Metrics
        </h2>

        <h3 className="text-xl font-semibold text-center mb-4">
          Submit a Prompt to Analyze
        </h3>

        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 mt-4"
          >
            Submit Prompt
          </button>
        </form>

        {errorMessage && (
          <p className="text-sm text-red-500 text-center">{errorMessage}</p>
        )}
        {isLoading && (
          <div className="flex flex-col justify-center items-center my-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
            <p className="mt-4 text-indigo-600">Loading...</p>{" "}
          </div>
        )}
        {responseData && (
          <div className="flex flex-wrap justify-between gap-6 mt-6">
            {/* Gemini Response Card */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 max-w-full min-w-[300px] overflow-auto h-[320px] overflow-y-auto">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                Gemini Response
              </h3>
              <p className="text-sm">{responseData.geminiResponse.response}</p>
              <div className="mt-4">
                <p>
                  <strong>Accuracy:</strong>{" "}
                  {responseData.geminiResponse.accuracy}
                </p>
                <p>
                  <strong>Relevancy:</strong>{" "}
                  {responseData.geminiResponse.relevancy}
                </p>
                <p>
                  <strong>Coherence:</strong>{" "}
                  {responseData.geminiResponse.coherence}
                </p>
                <p>
                  <strong>Completion:</strong>{" "}
                  {responseData.geminiResponse.completion}
                </p>
                <p>
                  <strong>Time Taken:</strong>{" "}
                  {responseData.geminiResponse.timeTaken} ms
                </p>
              </div>
            </div>

            {/* Llama Response Card */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 max-w-full min-w-[300px] overflow-auto h-[320px] overflow-y-auto">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                Llama Response
              </h3>
              <p className="text-sm">{responseData.llamaResponse.response}</p>
              <div className="mt-4">
                <p>
                  <strong>Accuracy:</strong>{" "}
                  {responseData.llamaResponse.accuracy}
                </p>
                <p>
                  <strong>Relevancy:</strong>{" "}
                  {responseData.llamaResponse.relevancy}
                </p>
                <p>
                  <strong>Coherence:</strong>{" "}
                  {responseData.llamaResponse.coherence}
                </p>
                <p>
                  <strong>Completion:</strong>{" "}
                  {responseData.llamaResponse.completion}
                </p>
                <p>
                  <strong>Time Taken:</strong>{" "}
                  {responseData.llamaResponse.timeTaken} ms
                </p>
              </div>
            </div>

            {/* Mixtral Response Card */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 max-w-full min-w-[300px] overflow-auto h-[320px] overflow-y-auto">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                Mixtral Response
              </h3>
              <p className="text-sm">{responseData.mixtralResponse.response}</p>
              <div className="mt-4">
                <p>
                  <strong>Accuracy:</strong>{" "}
                  {responseData.mixtralResponse.accuracy}
                </p>
                <p>
                  <strong>Relevancy:</strong>{" "}
                  {responseData.mixtralResponse.relevancy}
                </p>
                <p>
                  <strong>Coherence:</strong>{" "}
                  {responseData.mixtralResponse.coherence}
                </p>
                <p>
                  <strong>Completion:</strong>{" "}
                  {responseData.mixtralResponse.completion}
                </p>
                <p>
                  <strong>Time Taken:</strong>{" "}
                  {responseData.mixtralResponse.timeTaken} ms
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Metrics;
