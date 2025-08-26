const jwt = require("jsonwebtoken");
const User = require('../models/user')

const userAuth = async (req, res, next) => {
  try {
      const { token } = req.cookies;
      if(!token){
        throw new Error("Invalid Token pls Login again")
      };
      const decodedMsg = await jwt.verify(token,"devConnectSecret@007");
      const user = await User.findById(decodedMsg._id);
      if(!user){
        throw new Error('Invalid User');
      }
      req.user = user;
      next();
  } catch (err) {
    res.status(401).send("Error :" + err.message);
  }
};

// const adminAuth = (req,res,next)=>{
//  const token ='xyz';
//  if(token !== "xyz"){
//   console.log('Admin Auth Middleware');
//   res.status(401).send('Unauthorized request');
//  }else{
//   next();
//  }
// }

module.exports = { userAuth };
