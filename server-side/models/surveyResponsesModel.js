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

module.exports = {
    getNumberOfResponse,
};
