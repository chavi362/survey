import React from 'react';
import { useLocation } from 'react-router-dom';

const SurveyDetail = () => {
  const location = useLocation();
  const surveyData = location.state?.survey;

  if (!surveyData) {
    return <div>Loading...</div>;
  }

  // מיפוי השאלות ואופציות התשובות לשאלות סגורות
  const questionsMap = surveyData.reduce((acc, item) => {
    const questionCode = item.questionCode;
    if (!acc[questionCode]) {
      acc[questionCode] = {
        question: item.question,
        questionType: item.questionType,
        options: [],
      };
    }
    if (item.questionType === 'close' && item.optionText) {
      acc[questionCode].options.push(item.optionText);
    }
    return acc;
  }, {});

  const questions = Object.values(questionsMap);

  return (
    <div>
      <h1>rehrth</h1>
      <h1>{surveyData[0].surveyTitle}</h1>
      {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3>{question.question}</h3>
          {question.questionType === 'close' && question.options.length > 0 && (
            <ul>
              {question.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default SurveyDetail;
