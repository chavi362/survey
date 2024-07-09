import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CloseQuestionResponse from '../components/CloseQuestionResponse';
import OpenQuestionResponse from '../components/OpenQuestionResponse';
import { Container, Row, Col } from 'react-bootstrap';
import { serverRequests } from '../Api';
import useGetData from '../hooks/useGetData';
import FilterComponent from '../components/FilterComponent';

const SurveyResponses = () => {
  const { surveyCode } = useParams();
  const location = useLocation();
  const state = location.state || {};
  const { surveyTitle = 'Default Title', numberOfResponses = 0 } = state;

  const [questions, setQuestions] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    ageRange: [0, 100],
    areaID: '',
    incomeRange: [0, 100000],
    genderID: '',
    educationID: '',
    sectorID: ''
  });

  // Fetch questions
  const [questionsData, questionsError, questionsLoading] = useGetData(`surveys/${surveyCode}/questions`);

  useEffect(() => {
    if (questionsError) {
      setError(questionsError);
    } else if (questionsData) {
      setQuestions(questionsData);
    }
  }, [questionsData, questionsError]);

  useEffect(() => {
    setLoading(questionsLoading);
  }, [questionsLoading]);

  // Handle filter change
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    // Implement filtering logic based on `filters`
    // Update `filteredResponses` accordingly
  }, [filters]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Container>
      <h2>Survey Responses for {surveyTitle}</h2>
      <p>Number of Responses: {numberOfResponses}</p>
      <Row>
        <Col md={4}>
          <FilterComponent filters={filters} setFilters={setFilters} />
        </Col>
        <Col md={8}>
          <div>
            <h3>Questions</h3>
            {questions.map((question) => (
              <div key={question.questionCode}>
                <h4>{question.question}</h4>
                {question.questionType === 'close' ? (
                  <CloseQuestionResponse surveyCode={surveyCode} questionCode={question.questionCode} filters={filters}/>
                ) : (
                  <OpenQuestionResponse surveyCode={surveyCode} questionCode={question.questionCode} filters={filters} />
                )}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SurveyResponses;
