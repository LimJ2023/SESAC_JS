import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 리액트 18부터의 문법
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
