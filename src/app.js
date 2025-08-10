const express = require("express");
const { connectToDB } = require("./config/database");
const User = require("./models/user");
const app = express();
const PORT = process.env.PORT || 4444;

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sai",
    lastName: "Swarna",
    emailId: "Sai@gmail.com",
    password: "Sai@007",
  });
  try {
    await user.save();
    res.send("User Saved Successfully");
  } catch (err) {
    res.status(400).send("User save Failes" + err.toString());
  }
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
