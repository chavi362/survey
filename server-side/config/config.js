require('dotenv').config();
const {NODE_PORT,DB_PORT, NODE_ENV, DB_HOST,
    DB_PASSWORD,DB_NAME
}= process.env;
module.exports = {NODE_PORT,DB_PORT, NODE_ENV, DB_HOST,
    DB_PASSWORD,DB_NAME};