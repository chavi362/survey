const express = require("express");
const questionsRouter = express.Router();
const controller = require("../controllers/questionsController");
const surveyMiddleware = require("../middlwares/surveyMiddleware");

questionsRouter.use(surveyMiddleware);

questionsRouter.post("/", async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Survey ID:", req.surveyId);

  try {
    const result = await controller.createQuestion({ ...req.body, surveyId: req.surveyId });
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in questionsRouter:", err.message);
    res.status(500).json({ ok: false, error: err.message });
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
