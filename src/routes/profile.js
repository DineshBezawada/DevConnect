const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();

profileRouter.get('/profile', userAuth, (req, res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.send(400).send(`Err : ${err.msg}`)
    }
});

module.exports = profileRouter;