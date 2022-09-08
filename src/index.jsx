import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react/cjs/react.production.min";
import 'bootstrap-icons/font/bootstrap-icons.css';

import "./index.scss";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById("root")
);
