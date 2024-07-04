const pool = require('../DB.js');
const { createObject, getObjectByPram, deleteObject, updateObject } = require("./queryModel.js");

const createAnswer = async (questionCode, answer) => {
    try {
        const sql = createObject("surveyCloseAnswers", "questionCode, answer", "?, ?");
        const [result] = await pool.query(sql, [questionCode, answer]);
        return { answerCode: result.insertId, questionCode, answer };
    } catch (error) {
        throw error;
    }
};

const updateAnswer = async (answerCode, answer) => {
    try {
        const sql = updateObject("surveyCloseAnswers", "answer = ?", "answerCode = ?");
        const [result] = await pool.query(sql, [answer, answerCode]);
        return { answerCode, answer };
    } catch (error) {
        throw error;
    }
};

const getAnswerById = async (answerCode) => {
    try {
        const sql = getObjectByPram("surveyCloseAnswers", "answerCode = ?");
        const [rows] = await pool.query(sql, [answerCode]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteAnswer = async (answerCode) => {
    try {
        const sql = deleteObject("surveyCloseAnswers", "answerCode = ?");
        await pool.query(sql, [answerCode]);
    } catch (error) {
        throw error;
    }
};
async function getAnswersOfCloseQuestion(questionId) {
    try {
      const sql = getObjectByPram("surveycloseanswers", "questionCode");
      const [rows, fields] = await pool.query(sql, questionId);
      return rows;
    } catch (err) {
      throw err;
    }
  }
module.exports = {
    getAnswersOfCloseQuestion,
    createAnswer,
    updateAnswer,
    getAnswerById,
    deleteAnswer,
};
