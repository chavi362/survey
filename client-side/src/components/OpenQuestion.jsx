import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';


const OpenQuestion = ({ question }) => {
  
  return (
    <div className="mb-3">
   
  
          <Form.Control
            as="textarea"
            rows={3}
            name={`question-${question.questionCode}`}
            id={`question-${question.questionCode}-textarea`}
            placeholder="כתוב את תשובתך כאן"
          />
  
    </div>
  );
};

export default OpenQuestion;
