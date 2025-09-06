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
// const { userAuth } = require("./middlewares/auth");
const authRouter = require('./routes/auth');
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/', requestRouter);


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
