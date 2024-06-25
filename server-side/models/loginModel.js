//  import bcrypt from 'bcryptjs';

const pool = require("../DB");

async function postLogin(body) {
  try {
    console.log("in model");
    console.log(body);
    const body_userEmail = JSON.stringify(body.userEmail);
    const body_password = body.userPassword;
    console.log("model username: " + body_userEmail);
    console.log("model password: " + body_password);

    const sql = `SELECT * FROM users INNER JOIN passwords ON users.userCode = passwords.user_id WHERE users.email = ${body_userEmail}`;
    const result = await pool.query(sql);
    console.log(result[0][0]);

    // const userWithoutPassword = { ...result[0][0] };
    // delete userWithoutPassword.user_password;

    const user = result[0][0];
    console.log ("user:********");
    console.log (user);
    if (user) {
      console.log("pass : " + result[0][0].user_password);

      // const isMatch = await comparePasswords(body_password, result[0][0].user_password);
      const isMatch = true;

      if (isMatch) {
        console.log("Login successful");
        return {
          success: true,
          message: "Login successful",
          user: user,
        };
      } else {
        console.log("Incorrect password");
        throw new Error("Incorrect password");
      }
    } else {
      console.log("User not found");
      throw new Error("User not found");
    }
  } catch (err) {
    throw err;
  }
}

// const comparePasswords = async (plaintextPassword, hash) => {
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(plaintextPassword, hash, (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// };

module.exports = { postLogin };
