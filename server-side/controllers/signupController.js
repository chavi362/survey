const model = require('../model/signupModel');


async function postSignup(body) {
    console.log("controller body" + body);
    try {
        return model.postSignup(body);
    }
    catch (err) {
        throw err;
    }
};


async function getSignup(body) {
    try {
        return model.getSignup(body);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { postSignup, getSignup }