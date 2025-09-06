const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const User = require("../models/user");
const validator = require("validator");
const { validateSignUp } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  // Validation for Required fields
  // Never trust req.body
  validateSignUp(req);
  // Encrypt Passwords using bcrypt library
  const { firstName, lastName, emailId, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(firstName, lastName, emailId, password, "test");
  // Creating new Model of user Instance
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });

  try {
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
      console.log(user, "user");
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

module.exports = authRouter;
