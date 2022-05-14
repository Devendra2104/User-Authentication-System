import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import Logout from "./Components/Logout";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="*"
        element={
          <Provider store={store}>
            <App />
          </Provider>
        }
      >
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
