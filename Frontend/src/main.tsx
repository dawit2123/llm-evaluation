import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { MyProvider } from "./hooks/MyProvider";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyProvider>
      <App />
    </MyProvider>
  </React.StrictMode>
);
