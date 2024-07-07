const pool = require('../DB.js');

async function updateImage(image, question_id) {
    try {
        const sql = 'update surveysquestions set image_url = ? where questionCode = ?';
        const [result] = await pool.query(sql, [image, question_id]);
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
module.exports = {updateImage}