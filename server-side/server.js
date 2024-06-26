const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
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
const userRouter = require('./routes/userRouter.js');
const registerRouter = require('./routes/registerRouter.js');
const propertiesRouter = require('./routes/propertiesRouter.js');
const questionsRouter = require("./routes/questionsRouter.js");

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/surveys/:surveyId/questions", questionsRouter);
app.use("/surveys", surveyRouter); 
app.use("/allSurveys", surveysRouter);

app.use("/users", userRouter); 
app.use("/properties", propertiesRouter); 

app.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
});

// app.get('/logIn', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'React', 'login.jsx'));
// });

// const usersRouter = require("./routes/usersRouter")
// app.use("/users", usersRouter);