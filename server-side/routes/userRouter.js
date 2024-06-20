const express = require("express");
const userRouter = express.Router();
const { getAllUsers, getUsersByUserName, updateUser } = require('../controllers/userController');

userRouter.get("/", async (req, res) => {
    if (req.query.userName) {
        const usersRes = await getUsersByUserName(req, res);
        return res.status(200).json(usersRes);
    } else {
        getAllUsers(req, res);
    }
});

userRouter.put("/:id", async (req, res) => {
    const userRes = await updateUser(req, res);
    res.status(200).json(userRes);
});

module.exports = userRouter;
