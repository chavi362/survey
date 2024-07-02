const express = require("express");
const questionsRouter = express.Router({ mergeParams: true });
const controller = require("../controllers/questionsController");
const authenticateToken = require('../middlewares/authenticateToken');
const surveyMiddleware = require("../middlewares/surveyMiddleware");
questionsRouter.use(surveyMiddleware);
questionsRouter.post("/", authenticateToken, async (req, res) => {
  await controller.createQuestion(req, res);
});

questionsRouter.get("/:id/answers", async (req, res, next) => {
  try {
    const result = await controller.getAnswersOfCloseQuestion(req.params.id);
    console.log(result)
    res.json(result);
  } catch (err) {
    console.error("Error in questionsRouter:", err.message);
    res.status(400).json({ error: err.message });
    next(err);
  }
});

questionsRouter.get("/", async (req, res, next) => {
  try {
    console.log("Survey ID:", req.surveyId);
    const result = await controller.getQuestionsOfSurvey(req.surveyId);
    res.json(result);
  } catch (err) {
    console.error("Error in questionsRouter:", err.message);
    res.status(400).json({ error: err.message });
    next(err);
  }
});

module.exports = questionsRouter;
