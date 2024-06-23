const pool = require('../DB.js');


async function getUsersAmount() {
    try {
        const sql = `SELECT count(*) AS userCount FROM users`;
        const result = await pool.query(sql);

        console.log( result[0][0].userCount);
        console.log('hi ani po');

        if (result.length > 0) {
            return { success: true, message: "amount successful", amount: result[0][0].userCount };
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




module.exports = { getUsersAmount }  