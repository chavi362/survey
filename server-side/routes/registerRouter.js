
const express = require("express");
const registerRouter = express.Router();
const {registerUser} = require('../controllers/userController');
registerRouter.post("/", (async(req,res)=>
    {
        console.log("**************",req.body);
        const userRes= await registerUser(req.body.userName,req.body.password);
        return res.status(200).json(userRes);
    }
    ));
    
module.exports= registerRouter;