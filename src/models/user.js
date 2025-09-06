const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 85,
      trim: true,
      required : true
    },
    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is Invalid");
        }
      },
    },
    about: {
      type: String,
      trim: true,
      default: about(),
    },
    skills: {
      type: [String],
      required: true,
      validate(value) {
        const isValid = Array.isArray(value) && value.length > 0
        console.log(value,"isValid")
        if(!isValid){
          throw new Error("Skills are Mandatory")
         }
      },
    },

    photoUrl: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Pls enter valid photoUrl");
        }
      },
    },
  },
  { timestamps: true }
);

// Don't use arrow function  because we're using "this"
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "devConnectSecret@007", {
    expiresIn: "1h",
  });
  return token;
};

// Don't use arrow function
userSchema.methods.comparePassword = async function (passwordByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordvalid = await bcrypt.compare(passwordByUser, passwordHash);
  return isPasswordvalid;
};
// const UserModel = mongoose.model("User",userSchema);
// module.exports = UserModel;

//  OR

module.exports = mongoose.model("User", userSchema);
