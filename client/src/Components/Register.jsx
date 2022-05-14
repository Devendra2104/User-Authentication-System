import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const history = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendRequest = async () => {
    const response = await axios
      .post("http://localhost:5000/signup", {
        userName,
        email,
        password,
      })
      .catch((e) => console.log(e));
    const data = await response.data;
    console.log(data);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/login"));
  };
  return (
    <div>
      <form onSubmit={registerUser}>
        <div className="form-child">
          <label htmlFor="userName">Username: </label>
          <input
            id="userName"
            type="text"
            placeholder="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-child">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-child">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
