const express = require('express');
const router = express.Router();
const properties=require('../services/properties');

router.get('/sectors',async function (req, res,next){
    
    try {
        let sectors= await properties.getSectors();
        res.json(sectors);
      }
       catch (err) {
        console.log(err);
        next(err);
      }
    
});


router.get('/genders',async function (req, res,next){
    
    try {
        let genders= await properties.getGenders();
        res.json(genders);
      }
       catch (err) {
        console.log(err);
        next(err);
      }
    
});



router.get('/areas',async function (req, res,next){
    
    try {
        let areas= await properties.getAreas();
        res.json(areas);
      }
       catch (err) {
        console.log(err);
        next(err);
      }
    
});



module.exports = router;