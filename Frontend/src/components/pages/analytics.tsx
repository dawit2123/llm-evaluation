import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import { MyContext } from "../../hooks/MyProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "tailwindcss/tailwind.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(MyContext);
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(
          "http://localhost:5000/api/prompt/analytics",
          {
            method: "GET",
            headers: headers,
          }
        );

        const result = await response.json();
        if (result.status === "success") {
          setAnalyticsData(result.data);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [!user.isValidated]);

  if (user.isValidated === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-800">
          Please log in to access this page.
        </p>
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center my-6">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
        <p className="mt-4 text-indigo-600">Loading...</p>{" "}
      </div>
    );

  interface AnalyticsEntry {
    geminiResponse: {
      timeTaken: number;
      accuracy: string;
    };
    mixtralResponse: {
      timeTaken: number;
      accuracy: string;
    };
    llamaResponse: {
      timeTaken: number;
      accuracy: string;
    };
  }
  // Data processing
  const geminiMetrics = analyticsData.map((entry: AnalyticsEntry) => ({
    timeTaken: entry.geminiResponse.timeTaken,
    accuracy: parseFloat(entry.geminiResponse.accuracy),
  }));
  const mixtralMetrics = analyticsData.map((entry: AnalyticsEntry) => ({
    timeTaken: entry.mixtralResponse.timeTaken,
    accuracy: parseFloat(entry.mixtralResponse.accuracy),
  }));
  const llamaMetrics = analyticsData.map((entry: AnalyticsEntry) => ({
    timeTaken: entry.llamaResponse.timeTaken,
    accuracy: parseFloat(entry.llamaResponse.accuracy),
  }));

  const chartData = {
    labels: analyticsData.map((_, index) => `Request ${index + 1}`),
    datasets: [
      {
        label: "Gemini Time Taken (s)",
        data: geminiMetrics.map((metric) => metric.timeTaken / 1000), // Convert ms to s
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Mixtral Time Taken (s)",
        data: mixtralMetrics.map((metric) => metric.timeTaken / 1000), // Convert ms to s
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Llama Time Taken (s)",
        data: llamaMetrics.map((metric) => metric.timeTaken / 1000), // Convert ms to s
        borderColor: "rgba(0,0,0,0.8)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Time Taken (s)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-500 min-h-screen">
      <h1 className="text-4xl text-white text-center mb-6">Model Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Gemini Metrics</h2>
          <p>
            Average Accuracy:{" "}
            {(
              geminiMetrics.reduce((acc, curr) => acc + curr.accuracy, 0) /
              geminiMetrics.length
            ).toFixed(3)}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Mixtral Metrics</h2>
          <p>
            Average Accuracy:{" "}
            {(
              mixtralMetrics.reduce((acc, curr) => acc + curr.accuracy, 0) /
              mixtralMetrics.length
            ).toFixed(3)}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Llama Metrics</h2>
          <p>
            Average Accuracy:{" "}
            {(
              llamaMetrics.reduce((acc, curr) => acc + curr.accuracy, 0) /
              llamaMetrics.length
            ).toFixed(3)}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Time Taken Comparison</h2>
        <div style={{ height: "400px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
