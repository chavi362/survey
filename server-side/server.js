// const express = require('express');
// const path = require('path');
// const config = require('./config/config.js');
// const cors = require('cors');
// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'React', 'index.html'));
// });

// app.get('/logIn', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'React', 'login.jsx'));
// });
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
// const propertiesRouter=require("./routes/propertiesRouter")
// const loginRouter = require('./routes/loginRouter');
// const registerRouter=require('./routes/registerRouter');
// const userRouter = require('./routes/userRouter');
// const port = config.NODE_PORT;  
// app.use("/login", loginRouter);
// app.use("/users", userRouter);
// app.use("/register", registerRouter);    
// app.use("/properties", propertiesRouter);               
// // app.get('/', (req, res) => { res.send("goodluck!!! omeyn!!"); })
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });




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

// app.get('/logIn', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'React', 'login.jsx'));
// });

// const usersRouter = require("./routes/usersRouter")
// app.use("/users", usersRouter);

const loginRouter = require("./routes/loginRouter")
app.use("/login", loginRouter);

// const signupRouter = require("./routes/signupRouter")
// app.use("/signup", signupRouter);

 const surveysRouter = require("./routes/surveysRouter")
//  app.use("/surveysToConfirm", surveysRouter);
app.use("/allSurveys", surveysRouter);

// const postsRouter = require("./routes/postsRouter")
// app.use("/posts", postsRouter);

// const commentsRouter = require("./routes/commentsRouter")
// app.use("/comments", commentsRouter);

app.listen(PORT, () => {
  console.log(`SERVER:   http://localhost:${PORT}`);
});