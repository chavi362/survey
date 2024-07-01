import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { Form, Button } from 'react-bootstrap';

const CreateQuestion = ({ onSave }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [questionType, setQuestionType] = useState('open');
  const [question, setQuestion] = useState({ title: '', type: 'open', answers: [''] });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleTypeChange = (e) => {
    setQuestionType(e.target.value);
    setQuestion({ ...question, type: e.target.value, answers: [''] });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...question.answers];
    newAnswers[index] = value;
    setQuestion({ ...question, answers: newAnswers });
  };

  const handleAddAnswer = () => {
    setQuestion({ ...question, answers: [...question.answers, ''] });
  };

  const handleDeleteAnswer = (index) => {
    const newAnswers = question.answers.filter((_, i) => i !== index);
    setQuestion({ ...question, answers: newAnswers });
  };

  const handleSave = () => {
    console.log('Saving question:', question);
    onSave(question); // Update the parent with question data
    setIsEditing(false);
  };

  const handleCancel = () => {
    setQuestion({ title: '', type: 'open', answers: [''] });
    setIsEditing(false);
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
              >
                <option value="open">Open</option>
                <option value="close">Close</option>
              </Form.Select>
            </div>
            {questionType === 'close' && (
              <div className="mb-3">
                <label className="form-label">Answers:</label>
                {question.answers.map((answer, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={answer}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                    <Button variant="danger" className="ms-2" onClick={() => handleDeleteAnswer(index)}>
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
                {question.answers.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
            )}
            <Button onClick={() => setIsEditing(true)} className="btn btn-primary">
              <FaEdit /> Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuestion;
