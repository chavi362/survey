import React, { useState } from "react";
import OpenQuestion from "./OpenQuestion";
import CloseQuestion from "./CloseQuestion";
import { Form, Button } from "react-bootstrap";

const QuestionList = ({ questions, onSubmit, isManagerSeeing }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (questionCode, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionCode]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answers); // כאן תבצע את השליחה לשרת
    // שלח את התשובות לשרת בעזרת בקשה מתאימה
    onSubmit(answers);
  };

  return (
    <Form onSubmit={handleSubmit}>
    
      {questions.map((question) => (
        <div key={question.questionCode}>
          <Form.Group>
            <Form.Label>{question.question}</Form.Label>
            {question.questionType === "close" ? (
              <CloseQuestion question={question} handleChange={handleChange} isManagerSeeing={isManagerSeeing} />
            ) : (
              <OpenQuestion question={question} handleChange={handleChange} isManagerSeeing={isManagerSeeing} />
            )}
          </Form.Group>
        </div>
      ))}
    {!isManagerSeeing?(<Button type="submit">רישום התשובות</Button>):(<div></div>)}
    
    </Form>
  );
};

export default QuestionList;
