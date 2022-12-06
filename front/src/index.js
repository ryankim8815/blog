import React from "react";
import ReactDOM from "react-dom/client"; // react@18.2.0
// import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.css";

// optional
// import reportWebVitals from "./reportWebVitals"; // 앱 퍼포먼스를 분석하여 object 형태로 보여주는 기능 - google analytics 연동 가능

// react@18.2.0
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> // 두번 렌더하는 주범
  <App />
  // </React.StrictMode>
);

// //  react@17.0.1
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
