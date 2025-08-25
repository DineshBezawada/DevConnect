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
      const token = await jwt.sign({ _id: user._id }, "devConnectSecret@007");
      res.cookie("token", token);
      res.send("User Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token Pls Login Again");
    }
    const {_id} = jwt.verify(token, "devConnectSecret@007");
    // const {_id} = decodedMsg;
    console.log(req.cookies, "Cookies");
    // console.log(decodedMsg, "decodedCookie");

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    res.send({ user: user, msg: "User Profile Successful" });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/feed/:id", async (req, res) => {
  console.log(req.params, "Params");
  try {
    const id = req.params.id;
    const userInfo = await User.findById(id);
    res.send(userInfo);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.delete("/deleteUser/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    await User.findByIdAndDelete(userId);
    res.send({ user: user, msg: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});
app.patch("/updateUser/:userId", async (req, res) => {
  console.time();
  const userId = req.params.userId;
  const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "photoUrl",
    "skills",
  ];
  const isAllowed = Object.keys(req.body)?.every((item) =>
    ALLOWED_UPDATES.includes(item)
  );

  try {
    if (!isAllowed) {
      throw new Error(" Update not allowed");
    }

    if (req.body?.skills?.length > 5) {
      throw new Error("Only 5 skills are allowed");
    }
    // findByIdAndUpdate(id, ...) is equivalent to findOneAndUpdate({ _id: id }, ...)
    const user = await User.findByIdAndUpdate(userId, req.body, {
      returnDocument: "after",
      runValidators: true, // For running caustom validate function in Schema  Model.
    });
    // Or
    // const user = await User.findOneAndUpdate({ _id: userId }, upadatedData, {
    //   returnDocument: "after",
    // });

    // According to official Mongoose Docs above 2 will work in a same way.

    res.send({ user: user, msg: "User Details Updated Successfully" });
  } catch (err) {
    res.status(500).send("Something went wrong" + err.message);
  }
  console.timeEnd();
});

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
