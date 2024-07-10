
const express = require('express');
const surveyResponsesRouter =express.Router({ mergeParams: true });
const authenticateToken = require('../middlewares/authenticateToken');
const surveyMiddleware = require('../middlewares/surveyMiddleware');
const checkSurveyManager = require('../middlewares/checkSurveyManager');
const controller=require('../controllers/surveyResponsesController')
surveyResponsesRouter.get("/numberOfResponses",surveyMiddleware, authenticateToken, checkSurveyManager, controller.getNumberOfResponses);
surveyResponsesRouter.post('/:questionCode/filtered-responses',surveyMiddleware, authenticateToken, checkSurveyManager, controller.getFilteredResponsesController);
module.exports = surveyResponsesRouter;