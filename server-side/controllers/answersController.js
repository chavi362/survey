const model = require('../models/answersModel');

async function saveSurveyAnswers(userId, surveyId, answers) {
    const closeAnswers = Object.entries(answers).filter(([questionCode, answer]) => typeof answer === 'number');
    const openAnswers = Object.entries(answers).filter(([questionCode, answer]) => typeof answer === 'string');

    for (const [questionCode, answerCode] of closeAnswers) {
        await model.saveCloseAnswer(userId, answerCode);
    }

    for (const [questionCode, answer] of openAnswers) {
        await model.saveOpenAnswer(userId, questionCode, answer);
    }
}

module.exports = { saveSurveyAnswers };
