const jwt = require('jsonwebtoken');
const model = require('../models/userModel');
const config = require('../config/config');
const bcrypt = require('bcrypt');

async function postLogin(body) {
    console.log("controller body"+ body);
    try {
        
        return model.loginUser(body.userName, body.userPassword);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { postLogin }