const pool = require('../DB.js');
const { createObject, getObjectByPram, deleteObject, updateObject } = require("./queryModel.js");

const createAnswer = async (questionCode, answer) => {
    try {
        const sql = createObject("surveyCloseAnswers","questionCode,answer","?,?");
        const [result] = await pool.query(sql, [questionCode, answer]);
        return { answerCode: result.insertId, questionCode, answer };
    } catch (error) {
        throw error;
    }
};

const updateAnswer = async (answerCode, answer) => {
    try {
        const sql = updateObject("surveyCloseAnswers", "answer = ?", "answerCode");
        const [result] = await pool.query(sql, [answer, answerCode]);
        return { answerCode, answer };
    } catch (error) {
        throw error;
    }
};



const getAnswerById = async (answerCode) => {
    try {
        const sql = getObjectByPram("surveyCloseAnswers", "answerCode");
        const [rows] = await pool.query(sql, [answerCode]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createAnswer,
    updateAnswer,
    getAnswerById,
};
