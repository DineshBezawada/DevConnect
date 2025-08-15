const express = require("express");
const { connectToDB } = require("./config/database");
const User = require("./models/user");
const app = express();
const PORT = process.env.PORT || 4444;
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Saved Successfully");
  } catch (err) {
    res.status(400).send("User save Failes" + err.toString());
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
app.get("/feed", async (req, res) => {
  console.log(req.params, "Params");
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.delete("/deleteUser", async (req, res) => {
  const userId = req.body.id;
  try {
    const user = await User.findById(userId);
    await User.findByIdAndDelete(userId);
    res.send({ user: user, msg: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});
app.patch("/updateUser", async (req, res) => {
  console.time();
  const userId = req.body.id;
  const upadatedData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender : req.body.gender
  };
  try {
    // findByIdAndUpdate(id, ...) is equivalent to findOneAndUpdate({ _id: id }, ...)
    const user = await User.findByIdAndUpdate(userId, upadatedData, {
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
