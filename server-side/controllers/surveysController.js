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
const patchSurveyTitle = async (req, res) => {
    console.log(req.params)
    const { surveyCode } = req.params;
    const { title } = req.body;
    console.log(surveyCode,title)
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    try {
      const survey = await getSurveyById(surveyCode);
      if (!survey) {
        return res.status(404).json({ error: 'Survey not found' });
      }
  
      if (survey.managerCode !== req.user.id) {
        return res.status(403).json({ error: 'User is not authorized to update this survey' });
      }
 
      const result = await model.updateSurveyTitle(surveyCode, title);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Survey not found' });
      }
      res.status(200).json({ message: 'Survey title updated successfully' });
    } catch (error) {
      console.error('Error updating survey title:', error);
      res.status(500).json({ error: 'An error occurred while updating the survey title' });
    }
  };
  
async function updateSurvey(body) {
    try {
        return model.updateSurvey(body);
    }
    catch (err) {
        throw err;
    }
};
async function getSurveysByManager(req, res) {
    try {
        const managerCode = req.user.id;
        const result = await model.getSurveysByManager(managerCode);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = { getSurveys, getSurveyById, updateSurvey, getAllSurveys, createSurvey, patchSurveyTitle, getSurveysByManager };


