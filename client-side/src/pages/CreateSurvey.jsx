import React, { useState } from 'react';
import CreateQuestion from '../components/CreateQuestion'
import { FaPlus } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';

const CreateSurvey = () => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleSurveyTitleChange = (e) => {
    setSurveyTitle(e.target.value);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1 }]);
  };

  const handleSaveSurvey = () => {
    const survey = {
      title: surveyTitle,
      questions: questions.map(q => q.data), // assuming each CreateQuestion component will update its parent with question data
    };
    console.log('Saving survey:', survey);
    // handleSaveSurvey(survey); // Add logic to save the survey
  };

  const updateQuestion = (index, data) => {
    const newQuestions = questions.map((question, i) => i === index ? { ...question, data } : question);
    setQuestions(newQuestions);
  };

  return (
    <div className="container mt-5">
      <h1>Create Survey</h1>
      <Form.Group className="mb-3">
        <Form.Label>Survey Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter survey title"
          value={surveyTitle}
          onChange={handleSurveyTitleChange}
        />
      </Form.Group>
      {questions.map((question, index) => (
        <CreateQuestion
          key={index}
          onSave={(data) => updateQuestion(index, data)}
        />
      ))}
      <div className="d-flex justify-content-between mt-4">
        <Button onClick={handleAddQuestion} className="btn btn-primary">
          <FaPlus /> Add Question
        </Button>
        <Button onClick={handleSaveSurvey} className="btn btn-success">
          Save Survey
        </Button>
      </div>
    </div>
  );
};

export default CreateSurvey;
