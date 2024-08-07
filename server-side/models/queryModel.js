const config = require('../config/config')
const db = config.DB_NAME;
function createObject(table_name, values, columnsNum) {
    const query = `INSERT INTO ${db}.${table_name} (${values}) VALUES (${columnsNum})`;
    console.log(query)
    return query;
}
function getObjects(tableName, page, perPage) {
    let query;
    if (perPage) {
        const offset = (page - 1) * perPage;
        query = `SELECT * FROM ${db}.${tableName} LIMIT ${perPage} OFFSET ${offset}`;
    } else {
        query = `SELECT * FROM ${db}.${tableName}`;
    }
    console.log("Generated SQL Query:", query);
    return query; 
}
function getObjectsOfUser(tableName, pages, start) {//if pages so use limit
    const query = `SELECT * FROM ${db}.${tableName} where userId = ?`;// LIMIT ${limit} OFFSET ${start}
    return query;
}
function getObjectByPram(tableName, objectParam) {
    const query = `SELECT * FROM ${db}.${tableName}  where ${objectParam} = ?`;
    return query;
}
function updateObject(table_name, values, idParameter) {
    const query = `UPDATE ${db}.${table_name} SET ${values}  WHERE ${idParameter}=?`;
    console.log("update: " + query);
    return query;
}

function deleteObject(table_name, paramToDelete) {
    const query = `DELETE FROM ${db}.${table_name} WHERE  ${paramToDelete} = ?`;
    return query;
}

module.exports = { getObjectsOfUser, getObjectByPram, getObjects, createObject, deleteObject, updateObject } 