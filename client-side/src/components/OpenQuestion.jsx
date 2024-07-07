import React  from 'react';
import { Form } from 'react-bootstrap';


const OpenQuestion = ({ question, handleChange, isManagerSeeing }) => {
  
  return (
    <div className="mb-3">
   
  
          <Form.Control
            as="textarea"
            rows={1}
            name={`question-${question.questionCode}`}
            id={`question-${question.questionCode}-textarea`}
            placeholder="כתוב את תשובתך כאן"
            disabled = {isManagerSeeing}
            onChange={(e) => handleChange(question.questionCode, e.target.value)}
          />
  
    </div>
  );
};

export default OpenQuestion;
