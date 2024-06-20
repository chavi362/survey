const express = require("express");
const loginRouter = express.Router();
const { loginUser } = require('../controllers/userController');

loginRouter.post("/", async (req, res) => {
    console.log("**************", req.body);
    await loginUser(req, res);
});

module.exports = loginRouter;
