import React from "react";
import ReactDOM from "react-dom/client";
import { MoralisProvider } from "react-moralis";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import NavBr from "./components/NavBr";
import "./index.css";
import App from "./App";
import { InvestorProvider } from "./context/user";
import { SanityProvider } from "./context/sanityDB";

const root = ReactDOM.createRoot(document.getElementById("root"));
const appId = "mx084cQh2zoH1A60yjbSA8ZGczXm7RIUb8xk2AAw";
const serverUrl = "https://531zsrpxyfoc.usemoralis.com:2053/server";
root.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <InvestorProvider>
        <SanityProvider>
          <NavBr />
          <Container>
            <App />
          </Container>
          <ToastContainer />
        </SanityProvider>
      </InvestorProvider>
    </MoralisProvider>
  </React.StrictMode>
);
