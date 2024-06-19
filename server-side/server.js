const express = require('express');
const config = require('./config/config')
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port = config.NODE_PORT;                   
app.get('/', (req, res) => { res.send("goodluck!!! omeyn!!"); })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



const mysql = require('mysql');




const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '556260982',
  database: 'SurveyManagement'
});

connection.connect();

app.get('/api/education-levels', (req, res) => {
  connection.query('SELECT * FROM education_levels', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/api/surveys', (req, res) => {
  connection.query('SELECT * FROM surveys', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});