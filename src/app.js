const express = require("express");
const { connectToDB } = require("./config/database");
const app = express();
const PORT = process.env.PORT || 4444;
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth');
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/', requestRouter);
app.use('/',userRouter)


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
