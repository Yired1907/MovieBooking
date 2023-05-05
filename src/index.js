import React from "react";
import ReactDOM from "react-dom/client";
import * as signalR from "@aspnet/signalr";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DOMAIN } from "./util/setting/config";
export let connection = new signalR.HubConnectionBuilder()
  .withUrl(`https://movieapi.cyberlearn.vn/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();
const root = ReactDOM.createRoot(document.getElementById("root"));
connection
  .start()
  .then(() => {
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  })
  .catch((err) => {
    console.log(err);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
