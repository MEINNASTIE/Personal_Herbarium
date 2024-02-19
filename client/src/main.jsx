import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>
);
// Take note for React.StrictMode for it might need to be deleted for certain dependencies
// Don't forget to wrap Providers here
