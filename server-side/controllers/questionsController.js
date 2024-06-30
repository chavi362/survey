const model = require('../models/questionsModel');

async function getQuestionById(id) {
    console.log("controller body");
    try {
        return await model.getQuestionById(id);
    }
    catch (err) {
        throw err;
    }
};
async function getQuestionsOfSurvey(surveyCode) {
    console.log("controller body");
    try {
        return await model.getQuestionsOfSurvey(surveyCode);
    }
    catch (err) {
        throw err;
    }
};
async function getAnswersOfCloseQuestion(questionCode) {
    console.log("controller body");
    try {
        return await model.getAnswersOfCloseQuestion(questionCode);
    }
    catch (err) {
        throw err;
    }
};
async function createQuestion(body) {
    try {
        console.log(body + " in controller");
        return await model.createQuestion(body);
    } catch (err) {
        throw err;
    }
}

async function updateQuestion(body, id) {
    try {
        return await model.updateQuestion(body, id);
    }
    catch (err) {
        throw err;
    }
};

async function deleteQuestion(id) {
    try {
        return await model.deleteQuestion(id);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { getQuestionById, createQuestion, updateQuestion, deleteQuestion ,getQuestionsOfSurvey,getAnswersOfCloseQuestion};
