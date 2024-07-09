const express = require("express");
const userRouter = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const isAdmin = require('../middlewares/isAdmin');
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
        console.log(req.params);
        const userRes = await updateUser(req.body, req.params.id);
        return res.status(200).json(userRes);
    } catch (error) {
        console.error('Error in PUT /users/:id:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
userRouter.get('/admin', authenticateToken, isAdmin, (req, res) => {
    res.status(200).json({ isAdmin: true }); 
});

module.exports = userRouter;
