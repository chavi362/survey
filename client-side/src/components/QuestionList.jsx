import React from 'react';
import OpenQuestion from './OpenQuestion';
import CloseQuestion from './CloseQuestion';
import { Form } from 'react-bootstrap';
const QuestionList = ({ questions }) => {
    return (
        <div>
            {questions.map((question) => (
                <div key={question.questionCode}>
                    <Form.Group>
                        <Form.Label>{question.question}</Form.Label>
                        {question.questionType === 'close' ? (
                            <CloseQuestion question={question} />
                        ) : (
                            <OpenQuestion question={question} />
                        )}
                    </Form.Group>
                </div>
            ))}
        </div>
    );
};

export default QuestionList;
