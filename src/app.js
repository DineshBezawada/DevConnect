const express = require("express");
const { connectToDB } = require("./config/database");
const User = require("./models/user");
const app = express();
const PORT = process.env.PORT || 4444;
const { validateSignUp } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require('./middlewares/auth');

// Middleware
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Pls Enter Valid EmailId");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (isPasswordvalid) {
      const token = await jwt.sign({ _id: user._id }, "devConnectSecret@007",{expiresIn : '0d'});
      res.cookie("token", token,{httpOnly:true, expires: new Date(Date.now() + 8 + 3600000)});
      res.send("User Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile",userAuth, async (req, res) => {
  try {
    res.send({ user: req.user, msg: "User Profile Successful" });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
  const user = req.user;
  res.send("Connection Sent by " + user.firstName);
})


connectToDB()
  .then(() => {
    console.log("Database Connection successful");
    // Listen to Port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Connection failed");
  });
