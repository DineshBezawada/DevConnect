const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth')

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send("Connection Sent by " + user.firstName);
});
module.exports = requestRouter;
