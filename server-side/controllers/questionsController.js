const model = require('../models/questionsModel');
const closeAnswersModel = require('../models/closeAnswersModel');
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
  console.log(surveyCode)
    console.log("controller body");
    try {
        return await model.getQuestionsOfSurvey(surveyCode);
    }
    catch (err) {
        throw err;
    }
};
const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { title, type } = req.body;
  
    try {
      // Fetch the current question details
      const question = await model.getQuestionById(id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      if (question.questionType === 'close' && type === 'open') {
        const answers = await closeAnswersModel.getAnswersOfCloseQuestion(id);
        if (answers.length > 0) {
          return res.status(400).json({ error: 'Cannot change a close question to an open question if it has answers' });
        }
      }
  
      const result = await model.updateQuestion({ question: title, surveyCode: req.surveyId, questionType: type }, id);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).json({ error: 'An error occurred while updating the question' });
    }
  };
  
  
const createQuestion = async (req, res) => {
    const { surveyId } = req.params;
    const { title, type, image_url } = req.body;
  
    try {
      const result = await model.createQuestion(title,surveyId,  type, image_url);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ error: 'An error occurred while creating the question' });
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
module.exports = { getQuestionById, createQuestion, deleteQuestion ,getQuestionsOfSurvey,updateQuestion};
