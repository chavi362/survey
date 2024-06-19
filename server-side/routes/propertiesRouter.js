const express = require('express');
const router = express.Router();
const properties = require('../controllers/propertiesController');

router.get('/:property', async function (req, res, next) {
    try {
        let property = req.params.property;
        let result = await properties.getProperty(property);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
        next(err);
    }
});

module.exports = router;
