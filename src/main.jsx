// index.js o App.js (donde configuras tu enrutador)
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./bienvenida";
import Detection from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/deteccion" element={<Detection />} />{" "}
      {/* Asegúrate de que este componente esté definido */}
    </Routes>
  </Router>
);
