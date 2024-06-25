const jwt = require('jsonwebtoken');
const model = require('../models/loginModel');
const config = require('../config/config');

async function postLogin(body) {
    console.log("controller body"+ body);
    try {
        return model.postLogin(body);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { postLogin }


// const jwt = require('jsonwebtoken');
// const { postLogin } = require('../models/loginModel');
// const config = require('../config/config');

// exports.postLogin = async (req, res) => {
//   try {
//     console.log("in login controller");
//     console.log(req);
//     const result = await postLogin(req);
//     const user = result.user;
// console.log("after request");
// console.log(user);
//     if (user) {
//       // יצירת JWT
//       const token = jwt.sign({ userCode: user.userCode, role: user.role }, config.JWT_SECRET, {
//         expiresIn: '1h', // תוקף הטוקן לשעה אחת
//       });
//       console.log(res);
//       // שליחת הטוקן בתגובה
//       res.status(200).json({
//         success: true,
//         message: 'Login successful',
//         token: token,
//         user: {
//           userCode: user.userCode,
//           role: user.role,
//           ...user, // הוספת פרטים נוספים על המשתמש אם יש
//         },
        
//       });
//       console.log("im here");
//     } else {
//       res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
//   }
// };