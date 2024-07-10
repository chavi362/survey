const pool = require('../DB.js');
const bcrypt = require('bcrypt');
const { createObject, getObjectByPram, deleteObject, updateObject, getObjects } = require("./queryModel.js")

async function loginUser(userName, password) {
  try {
    const sql = `SELECT * FROM passwords JOIN users ON users.userCode = passwords.user_id WHERE users.username = ?`;
    const [result] = await pool.query(sql, [userName]);

    if (result.length > 0) {
      const user = result[0];
      console.log(user);
      const isMatch = await bcrypt.compare(password, user.user_password);
      if (isMatch) {
        return user;
      } else {
        return null;
      }
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sqlUser = 'INSERT INTO users (userName) VALUES (?)';
    const [userResult] = await pool.execute(sqlUser, [userName]);
    const userId = userResult.insertId;

    const sqlPassword = 'INSERT INTO passwords (user_id, user_password) VALUES (?, ?)';
    await pool.execute(sqlPassword, [userId, hashedPassword]);

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