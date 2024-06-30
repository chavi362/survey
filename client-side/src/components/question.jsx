import React from 'react';
import { Form } from 'react-bootstrap';

const Question = ({ question }) => {
  return (
    <div className="mb-3">
      <Form.Group>
        <Form.Label>{question.question}</Form.Label>
        {question.questionType === 'close' ? (
          <div>
            <Form.Check
              type="radio"
              name={`question-${question.questionCode}`}
              id={`question-${question.questionCode}-option1`}
              label="אפשרות 1"
            />
            <Form.Check
              type="radio"
              name={`question-${question.questionCode}`}
              id={`question-${question.questionCode}-option2`}
              label="אפשרות 2"
            />
          </div>
        ) : (
          <Form.Control
            as="textarea"
            rows={3}
            name={`question-${question.questionCode}`}
            id={`question-${question.questionCode}-textarea`}
            placeholder="כתוב את תשובתך כאן"
          />
        )}
      </Form.Group>
    </div>
  );
};

export default Question;
