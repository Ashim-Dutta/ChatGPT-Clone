require("dotenv").config();
const express = require("express");
const app = express();
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

// Body parser middleware (must be before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/", indexRoutes);

module.exports = app;
