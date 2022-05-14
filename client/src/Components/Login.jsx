import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./../store/store";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useNavigate();

  const sendRequest = async () => {
    const response = await axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .catch((e) => {
        setError(true);
        console.log(e);
      });
    const data = await response.data;
    console.log(data);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => history("/dashboard"));
  };
  const handleFocus = () => {
    if (error) setError(false);
  };
  return (
    <div>
      <form onSubmit={loginUser}>
        <div className="form-child">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onFocus={handleFocus}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-child">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onFocus={handleFocus}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <span>Entered Correct credentials Sir!</span>}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
