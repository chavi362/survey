const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();


app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(express.static('public'));


const config = require('./config/config.js');
const PORT = config.NODE_PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'React', 'index.html'));
// });

const loginRouter = require("./routes/loginRouter");
const surveysRouter = require("./routes/surveysRouter");
// const surveyRouter = require("./routes/surveyRouter");
const userRouter = require('./routes/userRouter.js');
const registerRouter = require('./routes/registerRouter.js');
const propertiesRouter = require('./routes/propertiesRouter.js');
const questionsRouter = require("./routes/questionsRouter.js");
const closeAnswersRouter = require("./routes/closeAnswersRouter.js");
const answersRouter = require("./routes/answersRouter.js");
const surveyResponsesRouter = require("./routes/surveyResponsesRouter.js");

const imagesRouter = require("./routes/imagesRouter")
app.use("/upload",imagesRouter)

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/surveys/:surveyId/questions/:questionCode/close-answers", closeAnswersRouter);
app.use("/surveys/:surveyId/answers", answersRouter);
app.use("/surveys/:surveyId/questions", questionsRouter);
// app.use("/surveys/:surveyId/confirm", surveysRouter);
app.use("/surveys", surveysRouter); 
// app.use("/allSurveys", surveysRouter);
app.use("/users", userRouter); 
app.use("/properties", propertiesRouter); 
app.use("/surveys/:surveyId/responses", surveyResponsesRouter); 
app.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
});
