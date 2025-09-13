const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionModel = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();
const mongoose = require("mongoose");

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
      if (connection?.fromUserId._id.equals(loggedInUser._id)) {
        or;
        // if (connectionRequest.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return connection.toUserId;
      }
      return connection.fromUserId;
    });
    res.send({ msg: "Connections Data fetched", data: data });
  } catch (err) {
    res.status(400).send(`ERROR : ${err.message}`);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;
    const skip = (page - 1) * limit;
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionModel.find({

          $or: [
            { fromUserId: loggedInUser._id },
            { toUserId: loggedInUser._id },
          ],
    }).select("fromUserId toUserId");

    const ignoredFeedUsers = new Set();
    connectionRequests.forEach((connectionRequest) => {
      ignoredFeedUsers.add(connectionRequest.fromUserId.toString());
      ignoredFeedUsers.add(connectionRequest.toUserId.toString());
    });
    const feedUsers = await User.find({
      $and: [
        { _id: { $nin: Array.from(ignoredFeedUsers) } },
        { _id: { $ne: loggedInUser._id.toString() } },
      ],
    })
      .select(USER_FIELDS)
      .skip(skip)
      .limit(limit);

    res.send({ msg: "Feed users Data sent successsfully", data: feedUsers });
    // console.time()
    // const loggedInUser = req.user;

    // // Aggregate all connected user IDs for the logged-in user
    // const connections = await ConnectionModel.aggregate([
    //   {
    //     $match: {
    //       $or: [
    //         { fromUserId: new mongoose.Types.ObjectId(loggedInUser._id) },
    //         { toUserId: new mongoose.Types.ObjectId(loggedInUser._id) },
    //       ],
    //     },
    //   },
    //   {
    //     $project: {
    //       userIds: ["$fromUserId", "$toUserId"],
    //     },
    //   },
    // ]);

    // // Flatten userIds and add loggedInUser._id
    // const ignoredIds = new Set([loggedInUser._id.toString()]);
    // connections.forEach((conn) => {
    //   conn.userIds.forEach((id) => ignoredIds.add(id.toString()));
    // });

    // // Query users not in ignoredIds
    // const feedUsers = await User.find({
    //   _id: {
    //     $nin: Array.from(ignoredIds).map((id) => new mongoose.Types.ObjectId(id)),
    //   },
    // }).select(USER_FIELDS);
    //     console.timeEnd()

    // res.send({ msg: "Feed users Data sent successfully", data: feedUsers });
  } catch (err) {
    res.status(400).send({ msg: `${err.message}`, error: err });
  }
});

module.exports = userRouter;
