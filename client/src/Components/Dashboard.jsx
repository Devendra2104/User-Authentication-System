import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
axios.defaults.withCredentials = true;

let firstRender = true;

const Dashboard = () => {
  const [user, setUser] = useState("");

  const refreshToken = async () => {
    const response = await axios
      .get("http://localhost:5000/refresh", {
        withCredentials: true,
      })
      .catch((e) => console.log(e));
    const data = await response.data;
    return data;
  };

  const sendRequest = async () => {
    const response = await axios.get("http://localhost:5000/dashboard", {
      withCredentials: true,
    });
    const data = await response.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    if (firstRender) {
      sendRequest().then((data) => setUser(data.user));
      firstRender = !firstRender;
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 22);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {user && (
        <div>
          Hello {user.userName} . You have Successfully authenticated Yourself!
          and made it to this point
        </div>
      )}
    </div>
  );
};

export default Dashboard;
