const model = require('../models/questionsModel');
const { getSurveyById } = require('../models/surveysModel');
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
async function createQuestion(req, res) {
    try {
      const { body, user } = req;
      const { surveyCode } = body;
      const survey = await getSurveyById(surveyCode);
      if (!survey) {
        return res.status(404).json({ error: 'Survey not found' });
      }
  
      if (survey.managerCode !== user.userCode) {
        return res.status(401).json({ error: 'User is not authorized to create a question for this survey' });
      }
      const result = await model.createQuestion(body);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Error in createQuestion:", err.message);
      return res.status(500).json({ error: 'An error occurred while creating the question' });
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
