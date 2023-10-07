import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"

import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     <Navbar></Navbar> 
      <App />
      <Footer></Footer>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
