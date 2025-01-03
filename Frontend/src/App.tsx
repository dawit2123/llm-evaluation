import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Metrics from "./components/pages/Metrics";
import Analytics from "./components/pages/analytics";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
