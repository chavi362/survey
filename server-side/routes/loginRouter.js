const express = require("express");
const loginRouter = express.Router();
const { postLogin } = require('../controllers/loginController');
const { generateToken } = require('../utils/jwtUtils');

loginRouter.post("/", async (req, res) => {
  console.log("Received POST request to /login");
  console.log("Request body:", req.body);

  try {
    const user = await postLogin(req.body);
    const token = generateToken(user);
    console.log(token);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000 // 1 hour
    });

    // Print the user data
    console.log("User data being sent:", { 
      success: true, 
      message: 'Login successful', 
      userCode: user.userCode,
      role: user.role,
      token: token  // Include the token in the response body
    });

    res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      userCode: user.userCode,
      role: user.role,
      token: token  // Include the token in the response body
    });
  } catch (err) {
    console.error("Error in loginRouter:", err.message);
    res.status(404).json({ ok: false, error: err.message });
  }
});

module.exports = loginRouter;
