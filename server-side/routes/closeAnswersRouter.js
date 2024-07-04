const express = require("express");
const answersRouter = express.Router({ mergeParams: true });
const controller = require("../controllers/closeAnswersController");
const authenticateToken = require('../middlewares/authenticateToken');
const surveyMiddleware = require("../middlewares/surveyMiddleware");
const checkSurveyManager = require('../middlewares/checkSurveyManager');

answersRouter.use(surveyMiddleware);
answersRouter.post("/", authenticateToken, checkSurveyManager, controller.createAnswer);
answersRouter.put("/:answerCode", authenticateToken, checkSurveyManager, controller.updateAnswer);
answersRouter.delete("/:answerCode", authenticateToken, checkSurveyManager, controller.deleteAnswer);

module.exports = answersRouter;
