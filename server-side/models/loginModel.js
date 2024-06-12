const pool = require('../DB.js');

async function postLogin(body) {
    try {
        body = JSON.parse(body);
        const body_username = JSON.stringify(body.username);
        const body_password = body.password;
        console.log("model username: " + body_username);
        console.log("model password: " + body_password);


        const sql = `SELECT * FROM users INNER JOIN passwords ON users.user_id = passwords.user_id WHERE users.username = ${body_username}`;
        const result = await pool.query(sql);
        console.log(result[0][0]);

        const userWithoutPassword = { ...result[0][0] };
        delete userWithoutPassword.user_password;


        if (result[0][0]) {
            console.log("pass" + result[0][0].user_password)



            const isMatch = await comparePasswords(body_password, result[0][0].user_password);

            if (isMatch) {
                console.log("Login successful");
                return { success: true, message: "Login successful", user: userWithoutPassword };
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

const comparePasswords = async (plaintextPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintextPassword, hash, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { postLogin } 