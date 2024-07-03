const express = require("express");
const answersRouter = express.Router({ mergeParams: true });
const controller = require("../controllers/closeAnswersController");
const authenticateToken = require('../middlewares/authenticateToken');
const surveyMiddleware = require("../middlewares/surveyMiddleware");
answersRouter.use(surveyMiddleware);
answersRouter.post("/", authenticateToken, controller.createAnswer);
answersRouter.put("/:answerCode", authenticateToken, controller.updateAnswer);
module.exports = answersRouter;
