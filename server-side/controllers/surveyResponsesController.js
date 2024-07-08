const model= require('../models/surveyResponsesModel');
const getNumberOfResponses = async (req, res) => {
    console.log(req.params.surveyId)
    try {
        const numberOfUsers = await model.getNumberOfResponse(req.params.surveyId);
        res.status(200).json({ numberOfUsers });
    } catch (error) {
        console.error('Error fetching number of responses:', error);
        res.status(500).json({ error: 'An error occurred while fetching the number of responses' });
    }
};
const getFilteredResponsesController = async (req, res) => {
    const { surveyCode } = req.params;
    const filters = req.body;
    try {
      const responses = await model.getFilteredResponses(surveyCode, filters);
      res.json(responses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports = {
    getNumberOfResponses,getFilteredResponsesController
};