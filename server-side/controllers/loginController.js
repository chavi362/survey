const jwt = require('jsonwebtoken');
const model = require('../models/userModel');
const config = require('../config/config');

async function postLogin(body) {
    console.log("controller body"+ body);
    try {
        return model.loginUser(body.userPassword,body.userName);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { postLogin }