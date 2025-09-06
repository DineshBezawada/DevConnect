const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfile } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send(400).send(`Err : ${err.msg}`);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfile(req)) {
      throw new Error("Edit Fields are Not Matched");
    }
    const user = req.user;
    console.log(req.body);
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    res.send({ message: `${user.firstName} Profile Updated Successfully`, data : user });
  } catch (err) {
    res.status(400).send(`Error : ${err.message}`);
  }
});

module.exports = profileRouter;
