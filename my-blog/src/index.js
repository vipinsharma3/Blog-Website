import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJK82wp-ivHRRqnyEQXKSpdNZ01S7mSEg",
  authDomain: "my-react-blog-9b9e2.firebaseapp.com",
  projectId: "my-react-blog-9b9e2",
  storageBucket: "my-react-blog-9b9e2.appspot.com",
  messagingSenderId: "928340306877",
  appId: "1:928340306877:web:1d979efb5557159efc80d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
