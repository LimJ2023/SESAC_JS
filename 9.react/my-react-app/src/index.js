import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const App2 = () => {
  return <h1>헬로우 리액트</h1>;
};
const App3 = () => {
  return <h1>광고가 오는 곳</h1>;
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App2 />
    <App3 />
  </React.StrictMode>
);
