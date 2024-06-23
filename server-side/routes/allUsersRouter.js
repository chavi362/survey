const express = require('express');
const allUsersRouter = express.Router();
const { getUsersAmount } = require('../controllers/allUsersController');


// router.post('/allSurveys', async function (req, res, next) {
//   let body = req.body;
//   try {
//     let surveys = await mySurveys.allSurveys(body);
//     res.json(surveys);
//   }
//   catch (err) {
//     console.log(err);
//     next(err);
//   }

// });


allUsersRouter.get('/amount', async function (req, res, next) {
    console.log("Received GET request to /amount");

  try {
    const result = await getUsersAmount();
    res.status(200).json(result);
  }
  catch (err) {
    console.log(err);
    next(err);
  }

});

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











module.exports = allUsersRouter;

