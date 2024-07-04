const pool = require("../DB.js");
const { createObject, getObjectByPram, deleteObject, updateObject, getObjects } = require("./queryModel.js")
async function getSurveysAmount() {
  try {
    console.log("******** cccccccc in surveysModel");
    const sql = `SELECT count(*) AS surveyCount FROM surveys`;
    const result = await pool.query(sql);

    console.log(result[0][0].surveyCount);
    console.log("hi ani po");

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
      console.log("Executing SQL Query:", sql);
      const [rows, fields] = await pool.query(sql, [id]);
      console.log("Fetched Rows:", rows[0]);
      return rows[0];
  } catch (err) {
      console.error("Error in getSurveyById:", err.message);
      throw err;
  }
}

async function getSurveys() {
  try {
    const sql = `SELECT * FROM surveys WHERE confirmed = FALSE` ;
    const result = await pool.query(sql);

    console.log(result[0]);
    console.log("hi ani po2");

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
    const sql = `SELECT * FROM surveys  limit ${limit} offset ${offset}` ;
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
    console.log("sql" +sql)
    const [result] = await pool.execute(sql, [survey.title,survey.managerCode]);
    const insertedId = result.insertId; 
    console.log(insertedId+"inserted")
    return insertedId;
  } catch (err) {
    throw err;
  }
}
async function updateSurveyTitle(surveyCode, newTitle) {
  try {
    const sql = updateObject("surveys", "surveyTitle=?", "surveyCode");
    console.log("sql: " + sql);
    const [result] = await pool.execute(sql, [newTitle, surveyCode]);
    return result;
  } catch (err) {
    throw err;
  }
}
async function updateSurvey(body) {
    const { surveyCode, confirmed} = body;
    try {
        const sql = `UPDATE surveys SET confirmed = ? WHERE surveyCode = ?`;
        const result = await pool.query(sql, [confirmed, surveyCode]);
        console.log(result);
        const getResponseSql = `SELECT * FROM surveys WHERE surveyCode = ${surveyCode}`;
        const getResponse = await pool.query(getResponseSql);
        if (getResponse.length > 0) {

            return { success: true, message: "update survey successful", survey: getResponse[0] };
        }
        else {
            throw new Error("Error :(")
        }
    }
    catch (err) {
        console.error('Error updating survey:', err);
        throw err;
    }
};

module.exports = { getSurveysAmount, getSurveys, getSurveyById, updateSurvey, getAllSurveys,createSurvey,updateSurveyTitle };
