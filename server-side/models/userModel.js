const pool = require('../DB.js');
const { createObject, getObjectByPram, deleteObject, updateObject, getObjects } = require("./queryModel.js")

async function loginUser(password,userName) {
  try {
    const sql = `SELECT * FROM Passwords  join Users on userCode=user_id  WHERE Users.username = ? AND Passwords.user_password = ? `;
    console.log(sql,userName,password);
    const result = await pool.query(sql, [userName,password]);
    console.log(result);
    if (result.length > 0) {
      console.log(result[0]);
      return result[0][0];
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

    const sqlUser = 'INSERT INTO users (userName) VALUES (?)';
    const [userResult] = await pool.execute(sqlUser, [userName]);
    const userId = userResult.insertId;

    const sqlPassword = 'INSERT INTO passwords (user_id, user_password) VALUES (?, ?)';
    await pool.execute(sqlPassword, [userId, password]);

    console.log('User registered successfully!');
    return { userCode: userId, userName: userName, role: 'user' };
  } catch (err) {
    console.error('Error in registerUser:', err);
    throw err;
  }
}

async function getUsersByUserName(userName, start = 0, limit = 2) {
  try {
    const sql = getObjectByPram("Users", "userName", limit, start);
    const [rows, fields] = await pool.query(sql, [userName]);
    return rows;
  } catch (err) {
    console.error('Error in getUsersByUserName:', err);
    throw err;
  }
}

async function getAllUsers() {
  try {
    const sql = getObjects("users");
    const [rows, fields] = await pool.query(sql);
    return rows;
  } catch (err) {
    console.error('Error in getAllUsers:', err);
    throw err;
  }
}

async function updateUser(updatedUser, userCode) {
  try {
    const queryTodo = updateObject("users", "name = ?, username = ?, email = ?, ageID = ?, genderID = ?, areaID = ?, sectorID = ?, educationID = ?, incomeID = ?", "userCode");
    
    const result = await pool.query(queryTodo, [
      updatedUser.firstName + ' ' + updatedUser.lastName,
      updatedUser.username,
      updatedUser.email,
      updatedUser.ageID,
      updatedUser.genderID,
      updatedUser.areaID,
      updatedUser.sectorID,
      updatedUser.educationID,
      updatedUser.incomeID,
      userCode
    ]);

    return result;
  } catch (err) {
    console.error('Error in updateUser:', err);
    throw err;
  }
}

module.exports = { getAllUsers, loginUser, getUsersByUserName, registerUser,updateUser } ;