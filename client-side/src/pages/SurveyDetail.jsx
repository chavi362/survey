import React,{useState,useEffect} from 'react';
import { useSurvey } from '../components/SurveyContext';
import useGetData from '../hooks/useGetData'; 
import WithLoader from '../hoc/WithLoader'
import QuestionList from '../components/QuestionList';

const SurveyDetail = () => {
    const { survey } = useSurvey();
console.log(survey)
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
    const QuestionsListWithLoader = WithLoader(QuestionList)
    return (
        <div>
          <h1>{survey.surveyTitle}</h1>
          <QuestionsListWithLoader loading={loading} questions={questions}/>
        </div>
    );
};

export default SurveyDetail;
