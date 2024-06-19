const express = require('express');
const config = require('./config/config.js');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const propertiesRouter=require("./routes/propertiesRouter")
const port = config.NODE_PORT;                   
app.get('/', (req, res) => { res.send("goodluck!!! omeyn!!"); })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});