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


    // const questionsMap = survey.reduce((acc, item) => {
    //     const questionCode = item.questionCode;
    //     if (!acc[questionCode]) {
    //         acc[questionCode] = {
    //             question: item.question,
    //             questionType: item.questionType,
    //             options: [],
    //         };
    //     }
    //     if (item.questionType === 'close' && item.optionText) {
    //         acc[questionCode].options.push(item.optionText);
    //     }
    //     return acc;
    // }, {});

    // const questions = Object.values(questionsMap);
    const QuestionsListWithLoader = WithLoader(QuestionList)
    return (
        <div>
          <h1>{survey.surveyTitle}</h1>
          <QuestionsListWithLoader loading={loading} questions={questions}/>
            {/* <h1>{survey[0].surveyTitle}</h1>
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
            ))} */}
        </div>
    );
};

export default SurveyDetail;
