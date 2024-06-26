import React, { useState, useContext } from 'react';
import CreateQuestion from '../components/CreateQuestion';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from '../App';
import { serverRequests } from "../Api";

const CreateSurvey = () => {
  const user = useContext(UserContext);
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isSurveySaved, setIsSurveySaved] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [surveyId, setSurveyId] = useState(null);

  const handleSurveyTitleChange = (e) => {
    setSurveyTitle(e.target.value);
  };

  const handleSaveSurvey = async () => {
    const survey = {
    title: surveyTitle,
      managerCode: user.userCode,
    };
    console.log(survey)
    try {
      const response = await serverRequests("POST", 'surveys', survey);
      const result = await response.json();
      if (response.ok) {
        console.log('Survey saved successfully:', result);
        setSurveyId(result.insertedId);
        setIsSurveySaved(true);
      } else {
        console.error('Failed to save survey:', result.error);
      }
    } catch (error) {
      console.error('Error saving survey:', error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, surveyId }]);
  };

  const updateQuestion = (index, data) => {
    const newQuestions = questions.map((question, i) => i === index ? { ...question, data } : question);
    setQuestions(newQuestions);
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="container mt-5">
      <h1>Create Survey</h1>
      {isSurveySaved ? (
        <>
          {isEditingTitle ? (
            <Form.Group className="mb-3">
              <Form.Label>Survey Title</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Enter survey title"
                  value={surveyTitle}
                  onChange={handleSurveyTitleChange}
                />
                <Button onClick={handleSaveTitle} className="btn btn-success ms-2">
                  Save Title
                </Button>
              </div>
            </Form.Group>
          ) : (
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>{surveyTitle}</h3>
              <Button onClick={handleEditTitle} className="btn btn-primary">
                <FaEdit /> Edit Title
              </Button>
            </div>
          )}
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
          </div>
        </>
      ) : (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Survey Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter survey title"
              value={surveyTitle}
              onChange={handleSurveyTitleChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-between mt-4">
            <Button onClick={handleSaveSurvey} className="btn btn-success">
              Save Survey
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateSurvey;
