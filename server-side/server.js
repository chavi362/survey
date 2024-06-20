const express = require('express');
const config = require('./config/config.js');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const propertiesRouter=require("./routes/propertiesRouter")
const loginRouter = require('./routes/loginRouter');
const registerRouter=require('./routes/registerRouter');
const userRouter = require('./routes/userRouter');
const port = config.NODE_PORT;  
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/register", registerRouter);    
app.use("/properties", propertiesRouter);               
app.get('/', (req, res) => { res.send("goodluck!!! omeyn!!"); })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
