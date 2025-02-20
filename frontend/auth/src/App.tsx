import React from "react";

import "./index.css";

import * as ReactDOMClient from "react-dom/client";

import Button from "container/Button";
import StoreProvider from "container/providers/StoreProvider";
console.log(Button);

const App = () => <div>auth</div>;

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container!);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
