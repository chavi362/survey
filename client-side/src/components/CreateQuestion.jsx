import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { Form, Button } from 'react-bootstrap';
import { serverRequests } from "../Api";

const CreateQuestion = ({ surveyCode, onDelete }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [questionType, setQuestionType] = useState('open');
  const [question, setQuestion] = useState({ title: '', type: 'open' });
  const [answers, setAnswers] = useState([]);
  const [questionCode, setQuestionCode] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleTypeChange = (e) => {
    if (answers.length > 0 && questionType === 'close') {
      alert("Cannot change the question type to 'open' because answers exist.");
      return;
    }
    const newType = e.target.value;
    setQuestionType(newType);
    setQuestion({ ...question, type: newType });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleAnswerBlur = (index) => {
    const answer = answers[index];
    if (answer && questionCode) {
      serverRequests("POST", `questions/${questionCode}/answers`, { answer })
        .then(response => response.json())
        .then(result => {
          if (response.ok) {
            console.log('Answer added successfully:', result);
          } else {
            console.error('Failed to add answer:', result.error);
          }
        })
        .catch(error => console.error('Error adding answer:', error));
    }
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, '']);
  };

  const handleDeleteAnswer = (index) => {
    const answer = answers[index];
    if (questionCode) {
      serverRequests("DELETE", `questions/${questionCode}/answers/${index}`)
        .then(response => {
          if (response.ok) {
            const newAnswers = answers.filter((_, i) => i !== index);
            setAnswers(newAnswers);
            console.log('Answer deleted successfully');
          } else {
            console.error('Failed to delete answer');
          }
        })
        .catch(error => console.error('Error deleting answer:', error));
    }
  };

  const handleSave = async () => {
    try {
      const response = await serverRequests("POST", `surveys/${surveyCode}/questions`, question);
      const result = await response.json();
      if (response.ok) {
        console.log('Question saved successfully:', result);
        setQuestionCode(result.questionCode);
        setIsEditing(false);
      } else {
        console.error('Failed to save question:', result.error);
      }
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  const handleCancel = () => {
    setQuestion({ title: '', type: 'open' });
    setAnswers([]);
    setIsEditing(false);
  };

  const handleDeleteQuestion = async () => {
    if (questionCode) {
      try {
        const response = await serverRequests("DELETE", `questions/${questionCode}`);
        if (response.ok) {
          console.log('Question deleted successfully');
          onDelete();
        } else {
          console.error('Failed to delete question');
        }
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    } else {
      onDelete();
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        {isEditing ? (
          <>
            <div className="mb-3">
              <label htmlFor="questionTitle" className="form-label">Question:</label>
              <input
                type="text"
                id="questionTitle"
                className="form-control"
                value={question.title}
                name="title"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="questionType" className="form-label">Type:</label>
              <Form.Select
                id="questionType"
                className="form-control"
                value={questionType}
                onChange={handleTypeChange}
                disabled={answers.length > 0}
              >
                <option value="open">Open</option>
                <option value="close">Close</option>
              </Form.Select>
            </div>
            {questionType === 'close' && questionCode && (
              <div className="mb-3">
                <label className="form-label">Answers:</label>
                {answers.map((answer, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={answer}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      onBlur={() => handleAnswerBlur(index)}
                    />
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => handleDeleteAnswer(index)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                ))}
                <Button variant="primary" onClick={handleAddAnswer}>
                  <FaPlus /> Add Answer
                </Button>
              </div>
            )}
            <div className="d-flex justify-content-between">
              <Button onClick={handleSave} className="btn btn-success">
                Save
              </Button>
              <Button onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div>
            <h5>{question.title}</h5>
            <p>Type: {question.type}</p>
            {question.type === 'close' && (
              <ul>
                {answers.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
            )}
            <div className="d-flex justify-content-between">
              <Button onClick={() => setIsEditing(true)} className="btn btn-primary">
                <FaEdit /> Edit
              </Button>
              <Button onClick={handleDeleteQuestion} className="btn btn-danger">
                <FaTrashAlt /> Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuestion;
