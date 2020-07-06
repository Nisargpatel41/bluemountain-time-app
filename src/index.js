import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrolltoTop";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/modal";
import "font-awesome/css/font-awesome.css";

import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById("root")
);
