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
const createQuestion = async (req, res) => {
    const { surveyId } = req.params;
    const { title, type } = req.body;
  
    try {
      const result = await model.createQuestion(title,surveyId,  type);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ error: 'An error occurred while creating the question' });
    }
  };
  
async function updateQuestion(body, id) {
    try {
        return await model.updateQuestion(body, id);
    }
    catch (err) {
        throw err;
    }
};

const deleteQuestion = async (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    try {
      await model.deleteQuestion(id);
      res.sendStatus(204);
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).json({ error: 'An error occurred while deleting the question' });
    }
  }
module.exports = { getQuestionById, createQuestion, updateQuestion, deleteQuestion ,getQuestionsOfSurvey,getAnswersOfCloseQuestion};
