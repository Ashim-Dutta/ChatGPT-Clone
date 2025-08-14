const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function getRegisterController(req, res) {
  res.render("register");
}

async function postRegisterController(req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    // Render register page with error message
    return res.status(400).render("register", {
      error: "User already exists",
      email,
      username,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
}

async function getLoginController(req, res) {
  res.render("login");
}

async function postLoginController(req, res) { 
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email:email
    })

    if (!user) { 
        return res.status(400).render("login", {
            error: "User not found",
            email,
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).render("login", {
            error: "Invalid password",
            email,
        });
    }
    const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRET);
    
    res.cookie("token", token);
    return res.status(200).json({
        message: "Login successful",
        user:user
    })

}

module.exports = {
  getRegisterController,
    postRegisterController,
    getLoginController,
    postLoginController
};
