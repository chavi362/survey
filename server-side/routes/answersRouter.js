const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { saveSurveyAnswers } = require('../controllers/answersController');

const answersRouter = express.Router();

answersRouter.post('/', async (req, res) => {
    try {
        const { surveyId, answers, userId } = req.body;
        console.log(surveyId);
        console.log(answers);
        console.log(userId);
        await saveSurveyAnswers(userId, surveyId, answers);
        res.status(200).json({ message: 'Answers saved successfully' });
    } catch (error) {
        console.error('Error saving answers:', error);
        res.status(500).json({ error: 'An error occurred while saving the answers' });
    }
});

module.exports = answersRouter;
