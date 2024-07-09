
const express = require('express');
const surveyResponsesRouter =express.Router({ mergeParams: true });
const authenticateToken = require('../middlewares/authenticateToken');
const surveyMiddleware = require('../middlewares/surveyMiddleware');
const checkSurveyManager = require('../middlewares/checkSurveyManager');
const controller=require('../controllers/surveyResponsesController')
// surveyResponsesRouter.get("/numberOfResponses", authenticateToken, checkSurveyManager, controller.getNumberOfResponses);
surveyResponsesRouter.get("/numberOfResponses",  controller.getNumberOfResponses);
surveyResponsesRouter.post('/:questionCode/filtered-responses', controller.getFilteredResponsesController);
module.exports = surveyResponsesRouter;