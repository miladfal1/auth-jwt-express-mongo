const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "something",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// view engine
app.set("view engine", "ejs");

// routes

app.use(authRoutes);

// database connection
const dbURI = "your mongoDB uri";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));
