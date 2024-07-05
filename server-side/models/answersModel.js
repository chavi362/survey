const config = require('../config/config');
const db = config.DB_NAME;
const pool = require('../DB.js');

async function saveCloseAnswer(userId, answerCode) {
    const sql = `INSERT INTO surveyCloseData (userCode, answerCode) VALUES (?, ?)`;
    try{
        const result = await pool.query(sql, [userId, answerCode]);
        if (result.length > 0) {

            return { success: true, message: "save close answer successful" };
        }
        else {
            throw new Error("Error :(")
        }
    }
    catch (err) {
        console.error('Error updating survey:', err);
        throw err;
    }
}

async function saveOpenAnswer(userId, questionCode, answer) {
    const sql = `INSERT INTO surveyOpenAnswers (questionCode, answer, userCode) VALUES (?, ?, ?)`;console.log("hegati ad can");
    try{
        const result = await pool.query(sql, [questionCode, answer, userId]);
        if (result.length > 0) {

            return { success: true, message: "save open answer successful" };
        }
        else {
            throw new Error("Error :(")
        }
    }
    catch (err) {
        console.error('Error updating survey:', err);
        throw err;
    }
}


module.exports = { saveCloseAnswer, saveOpenAnswer };
