const express = require("express");
const questionsRouter = express.Router({ mergeParams: true });
const controller = require("../controllers/questionsController");
const authenticateToken = require('../middlewares/authenticateToken');
const surveyMiddleware = require('../middlewares/surveyMiddleware');
const checkSurveyManager = require('../middlewares/checkSurveyManager');

questionsRouter.use(surveyMiddleware);

questionsRouter.post("/", authenticateToken, checkSurveyManager, async (req, res) => {
  await controller.createQuestion(req, res);
});

questionsRouter.get("/", async (req, res, next) => {
  try {
    console.log("trhjry")
    const result = await controller.getQuestionsOfSurvey(req.surveyId);
    res.json(result);
  } catch (err) {
    console.error("Error in questionsRouter:", err.message);
    res.status(400).json({ error: err.message });
    next(err);
  }
});

questionsRouter.put("/:id", authenticateToken, checkSurveyManager, async (req, res) => {
  await controller.updateQuestion(req, res);
});

questionsRouter.delete("/:id", authenticateToken, checkSurveyManager, async (req, res) => {
  console.log(req.params.id);
  await controller.deleteQuestion(req, res);
});

module.exports = questionsRouter;
