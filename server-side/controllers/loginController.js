const model = require('../models/loginModel');


async function postLogin(body) {
    console.log("controller body"+ body);
    try {
        return model.postLogin(body);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { postLogin }