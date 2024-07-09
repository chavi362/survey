const pool = require('../DB.js');
const { createObject, getObjectByPram, deleteObject, updateObject } = require("./queryModel.js");
const getNumberOfResponse = async (surveyCode) => {
    console.log(surveyCode)
    try {
        const sql = `
            SELECT COUNT(DISTINCT userCode) AS numberOfUsers
            FROM (
                SELECT userCode
                FROM surveyOpenAnswers oa
                JOIN surveysquestions sq ON oa.questionCode = sq.questionCode
                WHERE sq.surveyCode = ?

                UNION

                SELECT cd.userCode
                FROM surveyCloseData cd
                JOIN surveyCloseAnswers ca ON cd.answerCode = ca.answerCode
                JOIN surveysquestions sq ON ca.questionCode = sq.questionCode
                WHERE sq.surveyCode = ?
            ) AS combinedResults;
        `;
        const [result] = await pool.query(sql, [surveyCode, surveyCode]);
        return result[0].numberOfUsers;
    } catch (error) {
        throw error;
    }
};

const getFilteredResponses = async (questionCode, questionType, filters) => {
    try {
      // Base SQL for user filters
      let sql = `
        WITH user_answers AS (
      `;
  
      if (questionType === 'close') {
        sql += `
          SELECT cd.userCode, ca.answer, ca.answerCode
          FROM surveyCloseAnswers ca
          JOIN surveyCloseData cd ON ca.answerCode = cd.answerCode
          WHERE ca.questionCode = ?
        `;
      } else if (questionType === 'open') {
        sql += `
          SELECT oa.userCode, oa.answer, NULL AS answerCode
          FROM surveyOpenAnswers oa
          WHERE oa.questionCode = ?
        `;
      }
  
      sql += `), filtered_users AS (
              SELECT u.userCode
              FROM users u
      `;
  
      const joins = [];
      const filterConditions = [];
      const filterValues = [parseInt(questionCode)];
  
      if (filters.ageRange && filters.ageRange.length > 0) {
        joins.push('JOIN ages a ON u.ageID = a.ageID');
        filterConditions.push(`(a.startYear <= ? AND a.endYear >= ?)`);
        filterValues.push(filters.ageRange[1], filters.ageRange[0]);
      }
      if (filters.incomeRange && filters.incomeRange.length > 0) {
        joins.push('JOIN family_income_levels fil ON u.incomeID = fil.incomeID');
        filterConditions.push(`(fil.startRange <= ? AND fil.endRange >= ?)`);
        filterValues.push(filters.incomeRange[1], filters.incomeRange[0]);
      }
      if (filters.areaID != '') {
        filterConditions.push('u.areaID = ?');
        filterValues.push(filters.areaID);
      }
      if (filters.genderID != '') {
        filterConditions.push('u.genderID = ?');
        filterValues.push(filters.genderID);
      }
      if (filters.educationID != '') {
        filterConditions.push('u.educationID = ?');
        filterValues.push(filters.educationID);
      }
      if (filters.sectorID != '') {
        filterConditions.push('u.sectorID = ?');
        filterValues.push(filters.sectorID);
      }
      if (joins.length > 0) {
        sql += ' ' + joins.join(' ');
      }
      if (filterConditions.length > 0) {
        sql += ' WHERE ' + filterConditions.join(' AND ');
      }
  
      sql += `)
          SELECT COUNT(u.userCode) AS numberOfResponses, u.answer
          FROM filtered_users f
          JOIN user_answers u ON u.userCode = f.userCode
          GROUP BY u.answer;
      `;
  
      const [result] = await pool.query(sql, filterValues);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = { getNumberOfResponse, getFilteredResponses };
  