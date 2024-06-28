

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const config = require('./config/config.js');
const PORT = config.NODE_PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'React', 'index.html'));
});

const loginRouter = require("./routes/loginRouter");
const surveysRouter = require("./routes/surveysRouter");
const surveyRouter = require("./routes/surveyRouter");
// const questionRouter = require("./routes/questionRo");

app.use("/login", loginRouter);
app.use("/allSurveys", surveysRouter);//kipnis don'y like such
app.use("/surveys", surveyRouter); 
// app.use("/surveys/:surveyId/questions", questionRouter);

app.listen(PORT, () => {
  console.log(`SERVER:   http://localhost:${PORT}`);
});
// app.get('/logIn', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'React', 'login.jsx'));
// });

// const usersRouter = require("./routes/usersRouter")
// app.use("/users", usersRouter);