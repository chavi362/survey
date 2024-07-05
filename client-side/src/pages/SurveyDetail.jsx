import React,{useState,useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../components/SurveyContext';
import useGetData from '../hooks/useGetData'; 
import WithLoader from '../hoc/WithLoader'
import QuestionList from '../components/QuestionList';
import { serverRequests } from "../Api";
import { UserContext } from '../App';

const SurveyDetail = () => {
  const user = useContext(UserContext);
  console.log(user);
    const { survey } = useSurvey();
    console.log(survey)
const navigate = useNavigate();
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
        console.log(data)
      }
    }, [data, error]);

    const handleSubmit = async (answers) => {
      try {
        const surveyId = survey.surveyCode;
        let userId = user.userCode;
        const response = await serverRequests('POST',`surveys/${surveyId}/answers`, { surveyId, answers, userId });
        if (response.status === 200) {
          alert("תשובותיך נשמרו בהצלחה");
          navigate('/home/all-surveys');
        } else {
          console.error("Error saving answers:", response);
        }
      } catch (error) {
        console.error("Error saving answers:", error);
      }
    };

    const QuestionsListWithLoader = WithLoader(QuestionList)
    return (
        <div>
          <h1>{survey.surveyTitle}</h1>
          <QuestionsListWithLoader loading={loading} questions={questions} onSubmit={handleSubmit}/>
        </div>
    );
};

export default SurveyDetail;
