import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react/cjs/react.production.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Provider} from "react-redux";

import App from "./App";
import "./index.scss";
import {store} from "./redux";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
