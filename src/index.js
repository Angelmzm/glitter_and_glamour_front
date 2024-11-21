import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("root")); // Criar a raiz com createRoot
root.render(
  <Router basename="/glitter_and_glamour_front">
    <App />
  </Router>
);
