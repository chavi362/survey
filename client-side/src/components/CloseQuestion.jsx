import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import useGetData from '../hooks/useGetData';

const CloseQuestion = ({ question, handleChange, isManagerSeeing }) => {
    const [answers, setAnswers] = useState([]);
    const [data, error, loading, setLoading] = useGetData(`surveys/${question.surveyCode}/questions/${question.questionCode}/close-answers`);

    useEffect(() => {
        if (error) {
            console.error('Error fetching answers:', error);
        } else if (data) {
            setAnswers(data);
        }
    }, [data, error]);

    return (
        <div>
            {question.image_url && (
                <div>
                    <img className='images' src={`http://localhost:3000/images/${question.image_url}`} alt={`Question ${question.questionCode}`} />
                </div>
            )}
            {loading ? (
                <p>Loading answers...</p>
            ) : (
                answers.map((answer, index) => (
                    <div key={index}>
                        <Form.Check
                            type="radio"
                            disabled={isManagerSeeing}
                            name={`question-${question.questionCode}`}
                            id={`question-${question.questionCode}-option${index}`}
                            label={answer.answer} // Assuming answer has optionText property
                            onChange={() => handleChange(question.questionCode, answer.answerCode)}
                        />
                    </div>
                ))
            )}
        </div>
    );
}

export default CloseQuestion;
