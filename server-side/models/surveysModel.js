const pool = require('../DB.js');


async function getSurveysAmount() {
    try {
        const sql = `SELECT count(*) AS surveyCount FROM surveys`;
        const result = await pool.query(sql);

        console.log( result[0][0].surveyCount);
        console.log('hi ani po');

        if (result.length > 0) {
            return { success: true, message: "amount successful", amount: result[0][0].surveyCount };
        }
        else {
            console.log("amount not found");
            throw new Error(err)
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err)
    }
};


async function getSurveys() {
    try {
        const sql = `SELECT * FROM surveys WHERE confirmed = FALSE`;
        const result = await pool.query(sql);

        console.log( result[0]);
        console.log('hi ani po2');

        if (result.length > 0) {
            return { success: true, message: "surveys successful", surveys: result[0] };
        }
        else {
            console.log("surveys not found");
            throw new Error(err)
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err)
    }
};




module.exports = { getSurveysAmount, getSurveys }  