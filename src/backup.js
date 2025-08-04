const express = require("express");

const app = express();
const PORT = process.env.PORT || 4444;

// app.get(/^\/dinu+c$/,(req,res)=>{
//     res.send("User City Endpoint Hit");
//     console.log("User City Endpoint Hit");
// });

// app.get('/profile/:id',(req,res)=>{
//     const userId = req.params;
//     console.log("User ID =>", userId);
//     res.send(`User Profile ID is ${userId.id}`);
// });

// app.get('/uan',(req,res)=>{
//     const params = req.query;
//     console.log(params);
//     res.send('Success Params')
// })

// app.get('/user',(req,res)=>{
//     const user ={
//         name:'Dinesh Kumar',
//         age: 25,
//         city:"Hyderabad",
//         profession: "Software Engineer",
//     }
//   res.send(user)
// });
// app.post('/user',(req,res)=>{
//   res.send("User Profile Created");
// });
// app.delete('/user',(req,res)=>{
//   res.send("User Profile Deleted");
// });

// app.use("/user",(req,res)=>{
//     res.send("User Profile");
//     console.log("User Profile Endpoint Hit");
// });

// app.use("/",(req,res)=>{
//     res.send("DevTinder Node Server");
// });

// 04/08/2025
// Route Handlers, multiple Route handlers

app.use(
  "/myDetails",
  (req, res, next) => {
    console.log("1st Details Response");
    next();
    res.send("1st Success");
  },
  (req, res) => {
    console.log("2nd Details Response");
    res.send("2nd Success");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
