const express = require("express");
const userRouter = express.Router();
const { getAllUsers, getUsersByUserName, updateUser } = require('../controllers/userController');

userRouter.get("/", async (req, res) => {
    try {
        if (req.query.userName) {
            const usersRes = await getUsersByUserName(req.query.userName);
            return res.status(200).json(usersRes);
        } else {
            const usersRes = await getAllUsers();
            return res.status(200).json(usersRes);
        }
    } catch (error) {
        console.error('Error in GET /users:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

userRouter.put("/:id", async (req, res) => {
    try {
        const userRes = await updateUser(req.body, req.params.id);
        return res.status(200).json(userRes);
    } catch (error) {
        console.error('Error in PUT /users/:id:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = userRouter;
