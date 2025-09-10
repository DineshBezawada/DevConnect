const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionModel = require("../models/connectionRequest");
const userRouter = express.Router();

// Get all pending requests
const USER_FIELDS = "firstName lastName age gender skills";
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_FIELDS);
    //  OR
    // populate("fromUserId",['firstName lastName age gender skills'])
    // Both will work in a sameway
    res.send({ msg: "Data Processed Successfully", data: connectionRequests });
  } catch (err) {
    res.status(400).send(`ERROR : ${err.message}`);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionModel.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_FIELDS)
      .populate("toUserId", USER_FIELDS);

    const data = connections?.map((connection) => {
      if (connection?.fromUserId.equals(loggedInUser._id)) {
        return connection.toUserId;
      }
      return connection.fromUserId;
    });
    res.send({ msg: "Connections Data fetched", data: data });
  } catch (err) {
    res.status(400).send(`ERROR : ${err.message}`);
  }
});

module.exports = userRouter;
