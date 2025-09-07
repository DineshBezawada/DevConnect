const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const User = require("../models/user");
const validator = require("validator");
const { validateSignUp } = require("../utils/validation");
const jwt = require('jsonwebtoken');

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation for Required fields
    // Never trust req.body
    const { token } = req.cookies;
    if(token) 
    {
      const decodedMsg = await jwt.verify(token,'devConnectSecret@007');
      if(decodedMsg?._id){
        throw new Error("Pls Logout to Signup for new User");
      }
    }
    validateSignUp(req);
    // Encrypt Passwords using bcrypt library
    const { firstName, lastName, emailId, password, skills, age } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // Creating new Model of user Instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      skills,
      age,
      password: passwordHash,
    });
    await user.save();
    res.send("User Saved Successfully");
  } catch (err) {
    res.status(400).send("User save Failes" + err.toString());
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Pls Enter Valid EmailId");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // const isPasswordvalid = await bcrypt.compare(password, user.password);
    const isPasswordvalid = await user.comparePassword(password);
    if (isPasswordvalid) {
      // const token = await jwt.sign({ _id: user._id }, "devConnectSecret@007",{expiresIn : '0d'});
      const token = await user.getJWT();

      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 + 3600000),
      });
      res.send("User Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    const { token } = req.cookies;
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("User Successfully Logged Out");
  } catch (err) {
    res.status(500).send(`Error : ${err.message}`);
  }
});

module.exports = authRouter;
