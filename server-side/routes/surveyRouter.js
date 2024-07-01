const express = require("express");
const surveyRouter = express.Router();
const { createSurvey } = require("../controllers/surveysController");
surveyRouter.post("/", async (req, res) => {
  console.log("Request body:", req.body);

  try {
    const result = await createSurvey(req.body); 
    console.log("Survey creation successful, sending response...");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in surveysRouter:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = surveyRouter;
