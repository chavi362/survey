const surveyMiddleware = (req, res, next) => {
    console.log(req.params); 
    const surveyId = req.params.surveyId;
    console.log('Middleware - Survey ID:', surveyId); 
    if (!surveyId) {
      return res.status(400).json({ error: 'Survey ID is required' });
    }
    req.surveyId = surveyId;
    next();
  };

  module.exports = surveyMiddleware;
  