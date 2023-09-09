import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     <Navbar></Navbar> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
