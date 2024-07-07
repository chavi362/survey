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

module.exports = { getSurveysAmount, getSurveys, getSurveyById, updateSurvey, getAllSurveys, createSurvey, updateSurveyTitle, getSurveysByManager ,getSurveysAmountByManager,getSurveysByManager};
