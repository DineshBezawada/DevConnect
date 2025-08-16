const mongoose = require("mongoose");
const validator = require('validator');

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
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Email is Invalid")
        }
      }
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
      trim: true
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
    skills: [String],

    photoUrl :{
      type : String,
      trim: true,
      validate(value){
        if(!validator.isURL(value)){
          throw new Error("Pls enter valid photoUrl");
        }
      }
    }
  },
  { timestamps: true }
);

// const UserModel = mongoose.model("User",userSchema);
// module.exports = UserModel;

//  OR

module.exports = mongoose.model("User", userSchema);
