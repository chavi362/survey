const pool = require("../DB.js");
const { createObject, getObjectByPram, deleteObject, updateObject, getObjects, getObjectsOfUser } = require("./queryModel.js");

async function getSurveysAmount() {
  try {
    const sql = `SELECT count(*) AS surveyCount FROM surveys`;
    const result = await pool.query(sql);
    if (result.length > 0) {
      return result[0][0].surveyCount;
    } else {
      console.log("amount not found");
      throw new Error(err);
    }
  } catch (err) {
    console.error("Error:", err);
    throw new Error(err);
  }
}

async function getSurveyById(id) {
  try {
    const sql = getObjectByPram("surveys", "surveyCode");
    const [rows, fields] = await pool.query(sql, [id]);
    return rows[0];
  } catch (err) {
    console.error("Error in getSurveyById:", err.message);
    throw err;
  }
}

async function getSurveys() {
  try {
    const sql = `SELECT * FROM surveys WHERE confirmed = FALSE`;
    const result = await pool.query(sql);
    if (result.length > 0) {
      return {
        success: true,
        message: "surveys successful",
        surveys: result[0],
      };
    } else {
      console.log("surveys not found");
      throw new Error(err);
    }
  } catch (err) {
    console.error("Error:", err);
    throw new Error(err);
  }
}

async function getAllSurveys(limit, offset) {
  try {
    const sql = `SELECT * FROM surveys LIMIT ${limit} OFFSET ${offset}`;
    const result = await pool.query(sql);
    if (result.length > 0) {
      return {
        success: true,
        message: "allSurveys successful",
        surveys: result[0],
      };
    } else {
      console.log("allSurveys not found");
      throw new Error(err);
    }
  } catch (err) {
    console.error("Error:", err);
    throw new Error(err);
  }
}
async function getAllSurveysForAnswer(limit, offset, userCode) {
  console.log(userCode, "limit", limit,"ofsset",offset)
  try {
    const sql = `
      SELECT DISTINCT s.surveyCode, s.surveyTitle, s.managerCode, s.confirmed
      FROM surveys s
      JOIN surveysquestions sq ON s.surveyCode = sq.surveyCode
      WHERE s.confirmed = true
        AND s.surveyCode NOT IN (
          SELECT sq.surveyCode
          FROM surveysquestions sq
          LEFT JOIN surveyCloseAnswers sca ON sq.questionCode = sca.questionCode
          LEFT JOIN surveyCloseData scd ON sca.answerCode = scd.answerCode AND scd.userCode = ?
          LEFT JOIN surveyOpenAnswers soa ON sq.questionCode = soa.questionCode AND soa.userCode = ?
          WHERE scd.userCode IS NOT NULL OR soa.userCode IS NOT NULL
        )
      LIMIT ?
      OFFSET ?`;
      
console.log(sql, userCode,userCode, limit, offset);
    const params = [userCode,userCode, limit, offset];
    const result = await pool.query(sql, params);

    if (result[0].length > 0) {
      return {
        success: true,
        message: "allSurveys successful",
        surveys: result[0],
      };
    } else {
      console.log("No surveys found that match the criteria.");
      return {
        success: false,
        message: "No surveys found matching the criteria.",
        surveys: [],
      };
    }
  } catch (err) {
    console.error("Error:", err);
    throw new Error(err);
  }
}

async function getSurveysForAnswerAmount(userCode) {
  console.log("usercode",userCode)
  try {
    const sql = `SELECT count(*) AS surveyCount FROM surveys s JOIN surveysquestions sq ON s.surveyCode = sq.surveyCode
      WHERE s.confirmed = true
        AND s.surveyCode NOT IN (
          SELECT DISTINCT sq.surveyCode
          FROM surveysquestions sq
          LEFT JOIN surveyCloseAnswers sca ON sq.questionCode = sca.questionCode
          LEFT JOIN surveyOpenAnswers soa ON sq.questionCode = soa.questionCode
          LEFT JOIN surveyCloseData scd ON sca.answerCode = scd.answerCode
          WHERE (scd.userCode IS NULL OR soa.userCode = ?)
        )`;
    const result = await pool.query(sql, [userCode]);

    if (result[0].length > 0) {
      return result[0][0].surveyCount;
    } else {
      console.log("amount not found");
      throw new Error("amount not found");
    }
  } catch (err) {
    console.error("Error:", err);
    throw new Error(err);
  }
}

async function createSurvey(survey) {
  try {
    const sql = createObject("surveys", "surveyTitle,managerCode", "?,?");
    const [result] = await pool.execute(sql, [survey.title, survey.managerCode]);
    const insertedId = result.insertId;
    return insertedId;
  } catch (err) {
    throw err;
  }
}

async function updateSurveyTitle(surveyCode, newTitle) {
  try {
    const sql = updateObject("surveys", "surveyTitle=?", "surveyCode");
    const [result] = await pool.execute(sql, [newTitle, surveyCode]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateSurveyConfirm(surveyCode) {
  try {
    const sql = updateObject("surveys", "confirmed=?", "surveyCode");
    const [result] = await pool.execute(sql, [1, surveyCode]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateSurvey(body) {
  const { surveyCode, confirmed } = body;
  try {
    const sql = `UPDATE surveys SET confirmed = ? WHERE surveyCode = ?`;
    const result = await pool.query(sql, [confirmed, surveyCode]);
    const getResponseSql = `SELECT * FROM surveys WHERE surveyCode = ${surveyCode}`;
    const getResponse = await pool.query(getResponseSql);
    if (getResponse.length > 0) {
      return { success: true, message: "update survey successful", survey: getResponse[0] };
    } else {
      throw new Error("Error :(");
    }
  } catch (err) {
    console.error('Error updating survey:', err);
    throw err;
  }
}

async function getSurveysByManager(managerCode) {
  try {
    const sql = getObjectsOfUser("surveys", null, null);
    const [result] = await pool.query(sql, [managerCode]);
    if (result.length > 0) {
      return {
        success: true,
        message: "surveys retrieved successfully",
        surveys: result,
      };
    } else {
      console.log("No surveys found for this manager");
      return { success: true, message: "No surveys found for this manager", surveys: [] };
    }
  } catch (err) {
    console.error("Error:", err);
    throw new Error(err);
  }
}
async function getSurveysAmountByManager(managerCode) {
  try {
      const sql = `SELECT count(*) AS surveyCount FROM surveys WHERE managerCode = ?`;
      const [result] = await pool.query(sql, [managerCode]);
      if (result.length > 0) {
          return result[0].surveyCount;
      } else {
          console.log("amount not found");
          throw new Error(err);
      }
  } catch (err) {
      console.error("Error:", err);
      throw new Error(err);
  }
}
async function getSurveysByManager(managerCode) {
  try {
      const sql = `SELECT * FROM surveys WHERE managerCode = ?`;
      const [result] = await pool.query(sql, [managerCode]);
      if (result.length > 0) {
          return {
              success: true,
              message: "surveys retrieved successfully",
              surveys: result,
          };
      } else {
          console.log("No surveys found for this manager");
          return { success: true, message: "No surveys found for this manager", surveys: [] };
      }
  } catch (err) {
      console.error("Error:", err);
      throw new Error(err);
  }
}

module.exports = { getSurveysAmount, getSurveys, getSurveyById, updateSurvey, getAllSurveys, createSurvey, updateSurveyTitle, getSurveysByManager ,getSurveysAmountByManager,getSurveysByManager, updateSurveyConfirm,getAllSurveysForAnswer,getSurveysForAnswerAmount};
