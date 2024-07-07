const express = require("express");
const registerRouter = express.Router();
const { registerUser } = require('../controllers/userController');
const { generateToken } = require('../utils/jwtUtils'); // Assuming you have a JWT utility function

registerRouter.post("/", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userRes = await registerUser(userName, password);
    const token = generateToken(userRes);
    res.status(200).json({
      user: userRes,
      token: token
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

module.exports = registerRouter;
