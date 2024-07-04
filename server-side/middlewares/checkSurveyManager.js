// middlewares/checkSurveyManager.js
const surveyModel = require('../models/surveysModel');

async function checkSurveyManager(req, res, next) {
    const surveyId = req.surveyId;
    const userId = req.user.id;

    console.log('Checking survey manager');
    console.log('Survey ID:', surveyId);
    console.log('User ID:', userId);

    try {
        const survey = await surveyModel.getSurveyById(surveyId);
        console.log('Fetched Survey:', survey);

        if (!survey) {
            console.log('Survey not found');
            return res.status(404).json({ error: 'Survey not found' });
        }

        if (survey.managerCode !== userId) {
            console.log('User is not authorized to manage the questions of this survey');
            return res.status(403).json({ error: 'User is not authorized to manage the questions of this survey' });
        }

        next();
    } catch (error) {
        console.error('Error checking survey manager:', error);
        res.status(500).json({ error: 'An error occurred while checking the survey manager' });
    }
}

module.exports = checkSurveyManager;
