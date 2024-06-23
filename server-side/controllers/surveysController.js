const model = require('../models/surveysModel');


async function getSurveysAmount() {
    console.log("controller body");
    try {
        return model.getSurveysAmount();
    }
    catch (err) {
        throw err;
    }
};


async function getSurveys() {
    console.log("controller body");
    try {
        return model.getSurveys();
    }
    catch (err) {
        throw err;
    }
};


module.exports = { getSurveysAmount, getSurveys }