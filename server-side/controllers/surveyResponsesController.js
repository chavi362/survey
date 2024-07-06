const model= require('../models/surveyResponsesModel');
const getNumberOfResponses = async (req, res) => {
    try {
        const numberOfUsers = await model.getNumberOfResponse(req.surveyId);
        res.status(200).json({ numberOfUsers });
    } catch (error) {
        console.error('Error fetching number of responses:', error);
        res.status(500).json({ error: 'An error occurred while fetching the number of responses' });
    }
};

module.exports = {
    getNumberOfResponses,
};