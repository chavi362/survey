const express = require("express");
const surveysRouter = express.Router();
const {
  getSurveysAmount,
  getAllSurveys,
  getSurveys,
  getSurveyById,
  updateSurvey,
  createSurvey
} = require("../controllers/surveysController");

surveysRouter.get('/', getAllSurveys);
surveysRouter.post("/surveysToConfirm", async (req, res) => {
  console.log("Received POST request to /surveysToConfirm");
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

surveysRouter.get("/amount", async (req, res) => {
  try {
    console.log("*********** bbbbbbb in surveysRouter");
    res.send(await getSurveysAmount());
  } catch (err) {
    res.status(404).send({ ok: false });
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

// surveysRouter.get('/amount', async function (req, res, next) {
//     console.log("Received GET request to /amount");

//   try {
//     const result = await getSurveysAmount();
//     console.log("ani po");
//     console.log(result);
//     res.status(200).json(result);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });

// router.post('/answeredSurveys', async function (req, res, next) {

//   let body = req.body;
//   try {
//     let surveys = await mySurveys.answeredSurveys(body);
//     res.json(surveys);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });

// router.post('/answeredSurveys/amount', async function (req, res, next) {
//   let body = req.body;
//   try {
//     let surveysAmount = await mySurveys.answeredSurveysAmount(body);
//     res.json(surveysAmount);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });

// router.get('/reports', async function (req, res, next) {

//   try {
//     let surveys = await mySurveys.reports();
//     res.json(surveys);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });
// router.put('/setReport', async function (req, res, next) {
//   let body = req.body;
//   try {
//     let changeReport = await mySurveys.setReport(body);
//     res.json(changeReport);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });

// router.post('/', async function (req, res, next) {

//   try {
//     let body = req.body;
//     let surveys = await mySurveys.mySurveys(body);
//     console.log(surveys);
//     res.json(surveys);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });

// router.get('/questions/:id', async function (req, res, next) {

//   try {
//     let surveyID = req.params.id;
//     let questions = await mySurveys.getQuestions(surveyID);
//     res.json(questions);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });
// router.post('/insertSurvey', async function (req, res, next) {
//   let body = req.body;
//   try {
//     let insert = await mySurveys.insertSurvey(body);
//     res.json(insert);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });

// router.delete('/deleteSurvey/:id', async function (req, res, next) {
//   let surveyID = req.params.id;
//   try {
//     let deleteSurvey = await mySurveys.deleteSurvey(surveyID);
//     res.json(deleteSurvey);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });
// router.put('/updateShowResults', async function (req, res, next) {
//   let body = req.body;
//   try {
//     let update = await mySurveys.updateShowResults(body);
//     res.json(update);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });

// router.get('/answers/:questionID',async function (req, res,next){

//     try {
//         let questionID=req.params.questionID;
//         let answers= await mySurveys.getAnswers(questionID);
//         res.json(answers);
//       }
//        catch (err) {
//         console.log(err);
//         next(err);
//       }

// });

// router.get('/:id', async function (req, res, next) {

//   try {
//     let surveyID = req.params.id;
//     let survey = await mySurveys.getSurvey(surveyID);
//     res.json(survey);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });
// router.post('/getAvailableSurvey', async function (req, res, next) {
//   let body = req.body;

//   try {
//     let survey = await mySurveys.getAvailableSurvey(body);
//     res.json(survey);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });

module.exports = surveysRouter;
