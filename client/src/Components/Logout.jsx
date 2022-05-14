import React from "react";
import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <div>
      You have SuccessFully Logged Out
      <Link to="/">Go to Home Page Sir </Link>
    </div>
  );
};

export default Logout;
