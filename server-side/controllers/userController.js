const model = require('../models/userModel');



async function loginUser(userName,password){
    try{
       const userRes=await model.loginUser(userName,password);
       return userRes;
      // return res.status(200).json(userRes);
    }catch(err){
        throw err;
    } 
}
async function registerUser(userName,password){
    try{
    
       const userRes=await model.registerUser(userName,password);
       return userRes;
    }catch(err){
        throw err;
    } 
}
async function getUsersByUserName(userName){
    try{
       const userRes=await model.getUsersByUserName(userName);
       return userRes;
    }catch(err){
        throw err;
    }
}
async function getAllUsers() {
        const resultItems = await model.getAllUsers();
        return res.status(200).json(resultItems);
}
   

async function updateUser(userToUp,id) {
    try {
        const user=await model.updateUser(userToUp,id);
        return user;
    }
    catch (err) {
        throw err;
    }
}
module.exports = {loginUser,getAllUsers,getUsersByUserName,registerUser,updateUser}