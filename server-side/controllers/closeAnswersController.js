const model = require("../models/closeAnswersModel");
const surveyModel = require("../models/surveysModel");
const questionsModel = require("../models/questionsModel");

const createAnswer = async (req, res) => {
    const { surveyCode } = req.params;
    const { questionCode, answer } = req.body;

    try {
        const survey = await surveyModel.getSurveyById(surveyCode);
        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }

        if (survey.managerCode !== req.user.id) {
            return res.status(401).json({ error: 'User is not authorized to create answers for this survey' });
        }

        const question = await questionsModel.getQuestionById(questionCode);
        if (!question || question.surveyCode !== surveyCode || question.questionType !== 'close') {
            return res.status(400).json({ error: 'Invalid question or question type is not close' });
        }

        const result = await model.createAnswer(questionCode, answer);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating answer:', error);
        res.status(500).json({ error: 'An error occurred while creating the answer' });
    }
};

// Update an answer
const updateAnswer = async (req, res) => {
    const { surveyCode, answerCode } = req.params;
    const { answer } = req.body;

    try {
        const survey = await surveyModel.getSurveyById(surveyCode);
        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }

        if (survey.managerCode !== req.user.id) {
            return res.status(401).json({ error: 'User is not authorized to update answers for this survey' });
        }

        const answerData = await model.getAnswerById(answerCode);
        if (!answerData) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        const question = await questionsModel.getQuestionById(answerData.questionCode);
        if (!question || question.surveyCode !== surveyCode || question.questionType !== 'close') {
            return res.status(400).json({ error: 'Invalid question or question type is not close' });
        }

        const result = await model.updateAnswer(answerCode, answer);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating answer:', error);
        res.status(500).json({ error: 'An error occurred while updating the answer' });
    }
};

module.exports = {
    createAnswer,
    updateAnswer,
};
