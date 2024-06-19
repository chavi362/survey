import React, { useState, useEffect } from 'react';

const SurveysPage = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetch('/api/surveys')
      .then(response => response.json())
      .then(data => setSurveys(data))
      .catch(error => console.error('Error fetching surveys:', error));
  }, []);

  return (
    <div className="container">
      <h1>Surveys</h1>
      <ul>
        {surveys.map(survey => (
          <li key={survey.surveyCode}>
            <h2>{survey.surveyTitle}</h2>
            <p>{survey.report}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveysPage;
