const express = require("express");
const mongoose = require("mongoose");
const URI = `mongodb+srv://dineshbezawada:DinuCR7Rohit45@devconnect.fbiwzix.mongodb.net/devConnect`;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const connectToDB = async () => {
  await mongoose.connect(URI);
};
const app = express();
const router = express.Router();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    validate() {},
    index: true
  },
  password: {
    type: String,
  },
});
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "devConnectSecret", {
    expiresIn: "1h",
  });
  return token;
};
const userModel = new mongoose.model("User", userSchema);

router.post("/user", async (req, res) => {
  const { password } = req.body;
  const passwordHash = await bcrypt(password, 10);
  const user = new userModel({
    name: "dineshbezawada",
    password: password,
  });
  const data = await user.save();
  const token = await user.getJWT();
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 8 + 3600000),
  });
});

connectToDB()
  .then(() => {
    console.log("Connected to DB");
    app.listen(8888, () => {
      console.log("App is Running at Port 8888");
    });
  })
  .catch(() => {
    console.log("failed to connectToDB");
  });
