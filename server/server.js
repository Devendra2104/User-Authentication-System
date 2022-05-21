require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const homeRoute = require("./routes/home");
const signUpRoute = require("./routes/signUp");
const loginRoute = require("./routes/login");
const dashboardRoute = require("./routes/dashboard");
const refreshRoute = require("./routes/refresh");
const logoutRoute = require("./routes/logout");
const verifyRoute = require("./routes/verify");
const responseRoute = require("./routes/response");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(__dirname);
app.use("/", express.static(path.join(__dirname, "/views")));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://devo:devo@cluster0.gitkj.mongodb.net/UserDatabase?retryWrites=true&w=majority"
);

app.use("/", homeRoute);
app.use("/signup", signUpRoute);
app.use("/login", loginRoute);
app.use("/refresh", refreshRoute);
app.use("/dashboard", dashboardRoute);
app.use("/logout", logoutRoute);
app.use("/verify", verifyRoute);
app.use("/response", responseRoute);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(5000, () => console.log("Server is running at port 5000"));
});
