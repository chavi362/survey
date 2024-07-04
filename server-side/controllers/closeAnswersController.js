const model = require("../models/closeAnswersModel");
const questionsModel = require("../models/questionsModel");

const createAnswer = async (req, res) => {
    const { surveyId, questionCode } = req.params;
    const { answer } = req.body;

    console.log('Incoming request data:');
    console.log('surveyId:', surveyId);
    console.log('questionCode:', questionCode);
    console.log('answer:', answer);

    try {
        // Fetch the question from the database
        const question = await questionsModel.getQuestionById(questionCode);
        if (!question || question.surveyCode != surveyId || question.questionType != 'close') {
            console.log('Invalid question or question type is not close');
            return res.status(400).json({ error: 'Invalid question or question type is not close' });
        }
        const result = await model.createAnswer(questionCode, answer);
        console.log("rseult"+result.answerCode+ " " +result.questionCode+result.answer)
        res.status(201).json(result);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error creating answer:', error);
        res.status(500).json({ error: 'An error occurred while creating the answer' });
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
const updateAnswer = async (req, res) => {
    const { surveyId, answerCode } = req.params;
    const { answer } = req.body;

    try {
        const answerData = await model.getAnswerById(answerCode);
        if (!answerData) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        const question = await questionsModel.getQuestionById(answerData.questionCode);
        if (!question || question.surveyId !== surveyId || question.questionType !== 'close') {
            return res.status(400).json({ error: 'Invalid question or question type is not close' });
        }

        const result = await model.updateAnswer(answerCode, answer);
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating answer:', error);
        res.status(500).json({ error: 'An error occurred while updating the answer' });
    }
};

const deleteAnswer = async (req, res) => {
    const { surveyId, answerCode } = req.params;

    try {
        const answerData = await model.getAnswerById(answerCode);
        if (!answerData) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        const question = await questionsModel.getQuestionById(answerData.questionCode);
        if (!question || question.surveyId !== surveyId || question.questionType !== 'close') {
            return res.status(400).json({ error: 'Invalid question or question type is not close' });
        }

        await model.deleteAnswer(answerCode);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting answer:', error);
        res.status(500).json({ error: 'An error occurred while deleting the answer' });
    }
};

module.exports = {
    createAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswersOfCloseQuestion
};
