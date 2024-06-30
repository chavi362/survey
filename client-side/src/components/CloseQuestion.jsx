import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import useGetData from '../hooks/useGetData';
const CloseQuestion = ({ question }) => {
    const [answers, setAnswers] = useState([]);
    const [data, error, loading, setLoading] = useGetData(`surveys/${question.surveyCode}/questions/${question.questionCode}/answers`);

    useEffect(() => {
        if (error) {
            console.error('Error fetching answers:', error);
        } else if (data) {
            setAnswers(data);
        }
    }, [data, error]);

    return (
        <div>
             <div>
            {loading ? (
              <p>Loading answers...</p>
            ) : (
              answers.map((answer, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  name={`question-${question.questionCode}`}
                  id={`question-${question.questionCode}-option${index}`}
                  label={answer.answer} // Assuming answer has optionText property
                />
              ))
            )}
          </div>

        </div>
    )
}

export default CloseQuestion
