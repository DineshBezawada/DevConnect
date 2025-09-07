const mongoose = require("mongoose");
const { trim } = require("validator");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} isnincorrect status type`,
      },
    },
  },
  { timestamps: true }
);

connectionSchema.index({ fromUserId: 1, toUserId: 1 });

connectionSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You can not send request to yourself");
  }
  next();
});

const connectionModel = new mongoose.model(
  "ConnectionRequest",
  connectionSchema
);
module.exports = connectionModel;
