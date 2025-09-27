import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowswerRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowswerRouter>
      <App />
    </BrowswerRouter>
  </StrictMode>
);
