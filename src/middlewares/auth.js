const adminAuth = (req,res,next)=>{
 const token ='xyz';
 if(token !== "xyz"){
  console.log('Admin Auth Middleware');
  res.status(401).send('Unauthorized request');
 }else{
  next();
 }
}
const userAuth = (req,res,next)=>{
 const token ='xyz';
 if(token !== "xyz"){
  console.log('Admin Auth Middleware');
  res.status(401).send('Unauthorized request');
 }else{
  console.log('User Validated')
  next();
 }
}

module.exports = {adminAuth,userAuth}