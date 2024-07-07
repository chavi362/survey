const express = require("express");
const authenticateToken = require('../middlewares/authenticateToken');
const surveysRouter = express.Router();
const { getAllSurveys, getSurveys, getSurveyById, updateSurvey, createSurvey,patchSurveyTitle, patchSurveyConfirm} = require("../controllers/surveysController");

surveysRouter.get('/', getAllSurveys);

surveysRouter.get("/surveysToConfirm", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const result = await getSurveys(JSON.stringify(req.body));
    console.log("surveys successful, sending response...");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in surveysRouter:", err.message);
    res.status(404).json({ ok: false, error: err.message });
  }
});


surveysRouter.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  try {
    res.send(await getSurveyById(id));
  } catch (err) {
    res.status(404).send({ ok: false });
  }
});

surveysRouter.put("/:id", async (req, res) => {
  try {
    res.send(await updateSurvey(req.body));
  } catch (err) {
    res.status(404).send({ ok: false });
  }
});

surveysRouter.post("/", async (req, res) => {
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

surveysRouter.patch('/:surveyCode/title', authenticateToken, patchSurveyTitle);

surveysRouter.patch('/:surveyCode/confirm', authenticateToken, patchSurveyConfirm);



module.exports = surveysRouter;
