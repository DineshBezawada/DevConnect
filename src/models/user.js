const mongoose = require("mongoose");
const about = () => {
  return "I'm DK from OGL";
};
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 85,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is Invalid");
        }
      },
    },
    about: {
      type: String,
      default: about(),
    },
    skills: [String],
  },
  { timestamps: true }
);

// const UserModel = mongoose.model("User",userSchema);
// module.exports = UserModel;

//  OR

module.exports = mongoose.model("User", userSchema);
