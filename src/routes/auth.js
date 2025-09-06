const express = require("express");
const authRouter = express.Router();

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


module.exports= authRouter;