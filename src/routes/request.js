const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/connectionRequest/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const isAllowedStatus = ["interested", "ignored"];
      if (!isAllowedStatus.includes(status)) {
        return res.status(400).send("Status is Invalid - " + status);
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        res.status(402).send("Connection Request Already exist");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).send("User not found");
      }
      const data = await connectionRequest.save();
      res.send({
        msg: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
        data: data,
      });
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  }
);

requestRouter.post(
  "/connectionRequest/review/:status/:reqId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { reqId, status } = req.params;
      const ALLOWED_STATUS = ["accepted", "rejected"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).send({ massage: `Invalid status ${status}` });
      }
      const connectionRequestData = await ConnectionRequest.findOne({
        _id: reqId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequestData) {
        return res.status(404).send("Connection Request not Found");
      }

      connectionRequestData.status = status;
      const data = await connectionRequestData.save();
      res.send({
        message: `${loggedInUser.firstName} ${status} the Request`,
        data: data,
      });
    } catch (err) {
      res.status(400).send({ message: `ERROR : ${err.message}` });
    }
  }
);

module.exports = requestRouter;
