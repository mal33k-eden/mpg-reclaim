import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import NavBr from "./components/NavBr";
import App from "./App";
import { InvestorProvider } from "./context/user";
import { SanityProvider } from "./context/sanityDB";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <InvestorProvider>
      <SanityProvider>
        <NavBr />
        <Container>
          <App />
        </Container>
        <ToastContainer />
      </SanityProvider>
    </InvestorProvider>
  </React.StrictMode>
);
