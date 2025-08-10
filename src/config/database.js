const mongoose = require("mongoose");
const URI = `mongodb+srv://dineshbezawada:DinuCR7Rohit45@devconnect.fbiwzix.mongodb.net/devConnect`;

const connectToDB = async () => {
  await mongoose.connect(URI);
};

// connectToDB()
//   .then(() => {
//     console.log("Database Connection successful");
//   })
//   .catch((err) => {
//     console.log("Database Connection failed");
//   });
module.exports = { connectToDB };
