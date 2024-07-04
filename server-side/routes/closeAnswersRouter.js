const express = require("express");
const answersRouter = express.Router({ mergeParams: true });
const controller = require("../controllers/closeAnswersController");
const authenticateToken = require('../middlewares/authenticateToken');
const surveyMiddleware = require("../middlewares/surveyMiddleware");
const checkSurveyManager = require('../middlewares/checkSurveyManager');

answersRouter.use(surveyMiddleware);
answersRouter.get("/", async (req, res, next) => {
    console.log(req.params)
    try {
      const result = await controller.getAnswersOfCloseQuestion(req.params.questionCode);
      res.json(result);
    } catch (err) {
      console.error("Error in questionsRouter:", err.message);
      res.status(400).json({ error: err.message });
      next(err);
    }
  });
answersRouter.post("/", authenticateToken, checkSurveyManager, controller.createAnswer);
answersRouter.put("/:answerCode", authenticateToken, checkSurveyManager, controller.updateAnswer);
answersRouter.delete("/:answerCode", authenticateToken, checkSurveyManager, controller.deleteAnswer);

module.exports = answersRouter;
