const db = require('./db');
const config = require('./config');
 const users= require('../routes/properties');

 async function getSectors() {

    let sectors = await db.query(
        "SELECT * FROM sectors"
    );
    return sectors;
}

async function getGenders() {

    let genders = await db.query(
        "SELECT * FROM genders"
    );
    return genders;
}


async function getAreas() {

    let areas = await db.query(
        "SELECT * FROM areas"
    );
    return areas;
}

 module.exports = {
    getSectors, getGenders, getAreas
}

