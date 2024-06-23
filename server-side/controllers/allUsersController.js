const model = require('../models/allUsersModel');


async function getUsersAmount() {
    console.log("controller body");
    try {
        return model.getUsersAmount();
    }
    catch (err) {
        throw err;
    }
};

module.exports = { getUsersAmount }