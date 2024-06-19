const pool = require('../DB.js');
const { createObject, getObjectByPram, deleteObject, updateObject, getObjects } = require("./queryModel.js")

async function loginUser(userName, password) {
  try {
    const sql = 'SELECT * FROM Passwords natural join Users WHERE Users.userName = ? AND Passwords.password = ? ';
    const [rows, fields] = await pool.query(sql, [userName, password]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error in loginUser:', err);
    throw err;
  }
}
async function registerUser(userName, password) {
  try {
    const sqlUser = createObject("users", "userName", "?");
    const [userResult] = await pool.execute(sqlUser, [userName]);
    const userId = userResult.insertId;
    console.log("userId " + userId)
    const sqlPassword = createObject("passwords", "id,password", "?,?");
    console.log(sqlPassword);
    await pool.execute(sqlPassword, [userId, password]);
    console.log('User registered successfully!');
    return { "id": userId, "userName": userName };
  } catch (err) {
    console.error('Error in register:', err);
    throw err;
  }
}
async function getUsersByUserName(userName, start = 0, limit = 2) {
  try {
    const sql = getObjectByPram("Users", "userName", limit, start);
    const [rows, fields] = await pool.query(sql, [userName]);
    return rows;
  } catch (err) {
  }
}
async function getAllUsers() {
  const sql = getObjects("users", 0, 100);
  const [rows, fields] = await pool.query(sql);
  return rows;
}
async function updateUser(updatedUser, id) {
  const queryTodo = updateObject("users", "name = ?, userName = ?, email = ? , address = ? ,phone = ? , company = ?", "id");
  const result = await pool.query(queryTodo, [updatedUser.username, updatedUser.email,updatedUser.email,updatedUser.address,updatedUser.phone,updatedUser.company, id]);
  return updateUser;
}

module.exports = { getAllUsers, loginUser, getUsersByUserName, registerUser,updateUser } 