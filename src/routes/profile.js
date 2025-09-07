const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfile } = require("../utils/validation");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

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
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    res.send({
      message: `${user.firstName} Profile Updated Successfully`,
      data: user,
    });
  } catch (err) {
    res.status(400).send(`Error : ${err.message}`);
  }
});

profileRouter.post("/profile/updatePassword", userAuth, async (req, res) => {
  try {
    const { currentPassword, updatedPassword } = req.body;
        if(currentPassword === updatedPassword){
            throw new Error("Old and New password should not be same");
        }
    const user = req.user;
    const userBeforeUpdate = JSON.parse(JSON.stringify(user));
    const isMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isMatched) {
      throw new Error("Password is Incorrect");
    }
    const modifiedPasswordHash = await bcrypt.hash(updatedPassword, 10);
    user.password = modifiedPasswordHash;
    await user.save();
    res.send({
      message: `${user.firstName} password Updated successfully`,
      previous: userBeforeUpdate.password,
      after: user.password,
    });
  } catch (err) {
    res.status(500).send(`Error : ${err.message}`);
  }
});

module.exports = profileRouter;
