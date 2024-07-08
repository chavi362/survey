// import React, { useState, useEffect } from "react";
// import OpenQuestion from "./OpenQuestion";
// import CloseQuestion from "./CloseQuestion";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";

// const QuestionList = ({ questions, onSubmit, isManagerSeeing }) => {
//   const [answers, setAnswers] = useState({});

//   useEffect(() => {
//     // Load answers from localStorage on mount
//     const savedAnswers = JSON.parse(localStorage.getItem("answers"));
//     if (savedAnswers) {
//       setAnswers(savedAnswers);
//     }
//   }, []);


//   useEffect(() => {
//     // Save answers to localStorage on change
//     localStorage.setItem("answers", JSON.stringify(answers));
//   }, [answers]);

//   const handleChange = (questionCode, value) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionCode]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(answers);
//     onSubmit(answers);
//     localStorage.removeItem("answers");
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
    
//       {questions.map((question) => (
//         <div key={question.questionCode}>
//           <Form.Group>
//             <Form.Label className="form-control">{question.question}</Form.Label>
//             {question.questionType === "close" ? (
//               <CloseQuestion question={question} handleChange={handleChange} isManagerSeeing={isManagerSeeing} />
//             ) : (
//               <OpenQuestion question={question} handleChange={handleChange} isManagerSeeing={isManagerSeeing} />
//             )}
//           </Form.Group>
//         </div>
//       ))}
//     {!isManagerSeeing?(<Button type="submit">רישום התשובות</Button>):(<div></div>)}
    
//     </Form>
//   );
// };

// export default QuestionList;

import React, { useState, useEffect } from "react";
import OpenQuestion from "./OpenQuestion";
import CloseQuestion from "./CloseQuestion";
import { Form, Button, Container } from "react-bootstrap";
// import '../css/QuestionList.css'

const QuestionList = ({ questions, onSubmit, isManagerSeeing }) => {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Load answers from localStorage on mount
    const savedAnswers = JSON.parse(localStorage.getItem("answers"));
    if (savedAnswers) {
      setAnswers(savedAnswers);
    }
  }, []);

  useEffect(() => {
    // Save answers to localStorage on change
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const handleChange = (questionCode, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionCode]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answers);
    onSubmit(answers);
    localStorage.removeItem("answers");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <Form.Group className="mb-4" key={question.questionCode}>
            <Form.Label className="font-weight-bold">{question.question}</Form.Label>
            {question.questionType === "close" ? (
              <CloseQuestion
                question={question}
                handleChange={handleChange}
                isManagerSeeing={isManagerSeeing}
                
              />
            ) : (
              <OpenQuestion
                question={question}
                handleChange={handleChange}
                isManagerSeeing={isManagerSeeing}
              />
            )}
          </Form.Group>
        ))}
        {!isManagerSeeing && (
          <Button type="submit" className="mt-3">
            send answers
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default QuestionList;


