const model = require('../models/surveysModel');


async function getSurveyById(id) {
    console.log("controller body");
    try {
        return model.getSurveyById(id);
    }
    catch (err) {
        throw err;
    }
};
async function getSurveys() {
    console.log("controller body");
    try {
        return model.getSurveys();
    }
    catch (err) {
        throw err;
    }
};

async function getAllSurveys(req, res) {
    try {
        console.log(req.query)
        const page = parseInt(req.query.page, 10) || 1; 
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = (page - 1) * limit;

        const result = await model.getAllSurveys(limit, offset);
        console.log(result);
        const totalSurveys = await model.getSurveysAmount();
        console.log(totalSurveys) 
        console.log(offset + limit )
        const hasNextPage = offset + limit < totalSurveys;
        const hasPrevPage = offset > 0;
        res.setHeader('Link', [
            hasNextPage ? `<http://localhost:3000/allSurveys?page=${page + 1}&limit=${limit}>; rel="next"` : '',
            hasPrevPage ? `<http://localhost:3000/allSurveys?page=${page - 1}&limit=${limit}>; rel="prev"` : ''
        ].filter(Boolean).join(', '));
        res.json(result);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

async function createSurvey(body) {
    try {
        console.log(body+ "in controller")
        return await model.createSurvey(body);
    } catch (err) {
        throw err;
    }
}
async function updateSurvey(body) {
    try {
        return model.updateSurvey(body);
    }
    catch (err) {
        throw err;
    }
};


module.exports = { getSurveys, getSurveyById, updateSurvey, getAllSurveys,createSurvey }