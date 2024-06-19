
const {  getObjects } = require("./queryModel.js")
 async function getProperty(property) {
    const sql = getObjects(property );
    const [rows, fields] = await pool.query(sql);
    return rows;
}
 module.exports = {
    getProperty
}


