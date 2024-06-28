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

async function getSurveyById(id) {
    console.log("controller body");
    try {
        return model.getSurveyById(id);
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

async function getAllSurveys(body) {
    console.log("controller body");
    try {
        return model.getAllSurveys(body);
    }
    catch (err) {
        throw err;
    }
};
async function createSurvey(body) {
    try {
        console.log(body+ "in controller")
        return surveyRes =await model.createSurvey(body);
    } catch (err) {
        throw err;
    }
}
async function updateSurvey(body) {
    try {
        return model.updateSurvey(body);
    }
    catch (err) {
        throw err;
    }
};


module.exports = { getSurveysAmount, getSurveys, getSurveyById, updateSurvey, getAllSurveys,createSurvey }