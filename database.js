// const { MongoClient } = require("mongodb");

const URI = `mongodb+srv://dineshbezawada:DinuCR7Rohit45@devconnect.fbiwzix.mongodb.net/`;

// const client = new MongoClient(URI);

// const dbName = "Testing";

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   const collection = db.collection("Users");

//   // const newUser = {
//   //   firstName: "Ananth",
//   //   lastName: "P",
//   //   city: "Ongole",
//   //   age: 26,
//   // };
 
//   // const insertUsers = await collection.insertMany([newUser]);
//   // console.log("insertingUsers =>", insertUsers);

//   const findResult = await collection.find({}).toArray();
//   console.log("Found documents =>", findResult);


//   return "done.";
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
