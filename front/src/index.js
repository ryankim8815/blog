import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.css";

// optional
// import reportWebVitals from "./reportWebVitals"; // 앱 퍼포먼스를 분석하여 object 형태로 보여주는 기능 - google analytics 연동 가능

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
