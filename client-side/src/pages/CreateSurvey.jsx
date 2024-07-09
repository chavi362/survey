import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import CreateQuestion from '../components/CreateQuestion';
import { FaPlus, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from '../App';
import useLocalStorage from "../hooks/useLocalStorage";
import { serverRequests } from "../Api";

const CreateSurvey = () => {
  let navigate = useNavigate();
  console.log("craete rvet");
  const user = useContext(UserContext);
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isSurveySaved, setIsSurveySaved] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [surveyId, setSurveyId] =  useLocalStorage('surveyId', null);

  const handleSurveyTitleChange = (e) => {
    setSurveyTitle(e.target.value);
  };

  const handleSaveSurvey = async () => {
    const survey = {
      title: surveyTitle,
      managerCode: user.userCode,
    };
    console.log(survey);
    try {
      const response = await serverRequests("POST", 'surveys', survey);
      const result = await response.json();
      if (response.ok) {
        console.log('Survey saved successfully:', result);
        setSurveyId(result);
        setIsSurveySaved(true);
      } else {
        console.error('Failed to save survey:', result.error);
      }
    } catch (error) {
      console.error('Error saving survey:', error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1 }]);
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitle = async () => {
    try {
      const response = await serverRequests('PATCH', `surveys/${surveyId}/title`, { title: surveyTitle });
      if (response.ok) {
        console.log('Title updated successfully');
        setIsEditingTitle(false);
      } else {
        console.error('Failed to update title');
      }
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingTitle(false);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
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
                  className="me-2"
                />
                <Button onClick={handleSaveTitle} className="btn btn-success me-2">
                  <FaSave /> Save Title
                </Button>
                <Button onClick={handleCancelEdit} className="btn btn-secondary">
                  <FaTimes /> Cancel
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
              surveyCode={surveyId}
              onDelete={() => handleDeleteQuestion(question.id)}
            />
          ))}
          <div className="d-flex justify-content-between mt-4">
            <Button onClick={handleAddQuestion} className="btn btn-primary">
              <FaPlus /> Add Question
            </Button>
            <Button onClick={() => {navigate('/home')}} className="btn btn-success">
              Finish
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
