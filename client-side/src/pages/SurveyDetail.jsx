import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSurvey } from '../components/SurveyContext';
import useGetData from '../hooks/useGetData';
import WithLoader from '../hoc/WithLoader';
import QuestionList from '../components/QuestionList';
import { serverRequests } from "../Api";
import { UserContext } from '../App';

const SurveyDetail = () => {
  const user = useContext(UserContext);
  const { survey } = useSurvey();
  const navigate = useNavigate();
  const location = useLocation();
  const { isManagerSeeing } = location.state || {}; // Get the prop from the location state

  if (!survey) {
    return <div>Loading...</div>;
  }

  const [questions, setQuestions] = useState([]);
  const [data, error, loading, setLoading] = useGetData(`surveys/${survey.surveyCode}/questions`);

  useEffect(() => {
    if (error) {
      console.error('Error fetching questions:', error);
    } else if (data) {
      setQuestions(data);
      console.log(data);
    }
  }, [data, error]);

  const handleSubmit = async (answers) => {
    try {
      const surveyId = survey.surveyCode;
      let userId = user.userCode;
      const response = await serverRequests('POST', `surveys/${surveyId}/answers`, { surveyId, answers, userId });
      if (response.status === 200) {
        alert("Your answers have been saved successfully");
        navigate('/home/surveys');
      } else {
        console.error("Error saving answers:", response);
      }
    } catch (error) {
      console.error("Error saving answers:", error);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await serverRequests('POST', `surveys/${survey.surveyCode}/confirm`);
      if (response.status === 200) {
        alert("Survey confirmed successfully");
        navigate('/manager/surveysToConfirm');
      } else {
        console.error("Error confirming survey:", response);
      }
    } catch (error) {
      console.error("Error confirming survey:", error);
    }
  };

  const QuestionsListWithLoader = WithLoader(QuestionList);

  return (
    <div>
      <h1>{survey.surveyTitle}</h1>
      {isManagerSeeing ? (
        <button onClick={handleConfirm}>Confirm Survey</button>
      ) : (
        <QuestionsListWithLoader loading={loading} questions={questions} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default SurveyDetail;
