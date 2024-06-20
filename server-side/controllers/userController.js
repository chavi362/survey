const model = require('../models/userModel');

async function loginUser(req, res) {
    try {
        const { userName, password } = req.body;
        const userRes = await model.loginUser(userName, password);
        return res.status(200).json(userRes);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function registerUser(req, res) {
    try {
        const { userName, password } = req.body;
        const userRes = await model.registerUser(userName, password);
        return res.status(201).json(userRes);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function getUsersByUserName(req, res) {
    try {
        const userRes = await model.getUsersByUserName(req.query.userName);
        return res.status(200).json(userRes);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function getAllUsers(req, res) {
    try {
        const resultItems = await model.getAllUsers();
        return res.status(200).json(resultItems);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function updateUser(req, res) {
    try {
        const { userToUp, id } = req.body;
        const user = await model.updateUser(userToUp, id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { loginUser, getAllUsers, getUsersByUserName, registerUser, updateUser };
