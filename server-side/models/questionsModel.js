const pool = require('../DB.js');
const { createObject, getObjectByPram, deleteObject, updateObject } = require("./queryModel.js");
async function createQuestion(question) {
    try {
      const sql = createObject("surveysquestions", "question, surveyCode, questionType", "?,?,?");
      const [result] = await pool.query(sql, [question.question, question.surveyCode, question.questionType]);
      const insertedId = result.insertId;
      const newQuestion = { ...question, questionCode: insertedId };
      return newQuestion;
    } catch (err) {
      throw err;
    }
  }
  async function getQuestionById(id) {
    try {
      const sql = getObjectByPram("surveysquestions", "questionCode");
      const [rows, fields] = await pool.query(sql, id);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
  async function updateQuestion(updatedQuestion, id) {
    try {
      const sql = updateObject("surveysquestions", "question = ?, surveyCode = ?, questionType = ?", "questionCode");
      const result = await pool.query(sql, [updatedQuestion.question, updatedQuestion.surveyCode, updatedQuestion.questionType, id]);
      return result;
    } catch (err) {
      throw err;
    }
  }
  async function deleteQuestion(questionCode) {
    try {
      const sql = deleteObject("surveysquestions", "questionCode");
      const result = await pool.query(sql, [questionCode]);
      return result;
    } catch (err) {
      throw err;
    }
  }
  module.exports = {
    createQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion
  };
          