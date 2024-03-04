const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// create json web token
const maxAge = 3 * 24 * 60 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "my secret", {
    expiresIn: maxAge,
  });
};

// controller actions
const getSignUp = (req, res) => {
  res.render("signup");
};

const postSignUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).redirect("/");
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getLogin = (req, res) => {
  const error = req.flash("message");
  res.render("login", { error });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email or Password Is Incorrect");
    }
    if (user.password !== password) {
      throw new Error("Email or Password Is Incorrect");
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    // Flash success message and redirect after a timeout
    const secess = "login sucess fully";
    setTimeout(() => {
      res.redirect("/");
    }, 1000); // 1 second timeout
  } catch (err) {
    req.flash("message", err.message);
    res.redirect("/login");
  }
};

const getLogOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  getLogin,
  postLogin,
  getSignUp,
  postSignUp,
  getLogOut,
};
