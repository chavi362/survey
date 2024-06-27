import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { serverRequests } from '../Api';

const SurveyDetail = () => {
  const location = useLocation();
  const { surveyCode } = location.state;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchSurveyQuestions = async () => {
      const url = `surveys/${surveyCode}/questions`;
      try {
        const response = await serverRequests('GET', url, null);
        if (!response.ok) {
          alert('לא הצלחנו לטעון את השאלות של הסקר.');
          return;
        }
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching survey questions:', error);
      }
    };
    fetchSurveyQuestions();
  }, [surveyCode]);

  const handleInputChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `surveys/${surveyCode}/submit`;
    try {
      const response = await serverRequests('POST', url, { answers });
      if (!response.ok) {
        alert('לא הצלחנו לשמור את התשובות שלך.');
        return;
      }
      alert('התשובות נשמרו בהצלחה!');
    } catch (error) {
      console.error('Error submitting survey answers:', error);
    }
  };

  return (
    <div>
      <h2>סקר: {surveyCode}</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <p>{question.text}</p>
            {question.type === 'open' ? (
              <input
                type="text"
                value={answers[question.id] || ''}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
            ) : (
              <select
                value={answers[question.id] || ''}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              >
                <option value="">בחר תשובה</option>
                {question.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button type="submit">שלח תשובות</button>
      </form>
    </div>
  );
};

export default SurveyDetail;
