// src/index.js
import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import "./styles/tailwind.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Get the root element
const rootElement = document.getElementById("root");
// Create a root
const root = createRoot(rootElement);
// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
