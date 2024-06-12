const express = require("express");
const router = express.Router();
const controller = require('../controllers/signupController.js');

router.post("/", async (req, res) => {
    console.log("req:", req.body);
    try {
        res.send(await controller.postSignup(JSON.stringify(req.body)));
    } catch (err) {
        res.status(404).send({ ok: false });
    }

});

router.get("/", async (req, res) => {
    console.log("req:", req.body);
    try {
        res.send(await controller.getSignup(JSON.stringify(req.body)));
    } catch (err) {
        res.status(404).send({ ok: false });
    }

});

module.exports = router;