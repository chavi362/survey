// File: src/components/SurveyResponses.js
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CloseQuestionResponse from '../components/CloseQuestionResponse';
import OpenQuestionResponse from '../components/OpenQuestionResponse';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { serverRequests } from '../Api';
import useGetData from '../hooks/useGetData';
import FilterComponent from '../components/FilterComponent';
import * as XLSX from 'xlsx';

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

  const sanitizeSheetName = (name) => {
    return name.replace(/[\/\?\*\[\]\\]/g, '_').replace(/[:]/g, '-');
  };

  const downloadSurveyResponsesAsExcel = async () => {
    setLoading(true);
    const workbook = XLSX.utils.book_new();
    let sheetAdded = false;

    for (const question of questions) {
      try {
        const response = await serverRequests("POST", `surveys/${surveyCode}/responses/${question.questionCode}/filtered-responses`, {
          questionType: question.questionType,
          filters
        });
        const responseData = await response.json();

        console.log(`Response Data for question ${question.questionCode}:`, responseData);

        if (responseData.length > 0) {
          const worksheetData = responseData.map(response => ({
            Answer: response.answer,
            NumberOfResponses: response.numberOfResponses
          }));

          console.log(`Worksheet Data for question ${question.questionCode}:`, worksheetData);

          if (worksheetData.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(worksheetData);
            const sanitizedSheetName = sanitizeSheetName(question.question);
            XLSX.utils.book_append_sheet(workbook, worksheet, sanitizedSheetName);
            sheetAdded = true;
          }
        }

      } catch (err) {
        setError(err.message);
        console.error(`Error fetching responses for question ${question.questionCode}:`, err);
      }
    }

    if (sheetAdded) {
      XLSX.writeFile(workbook, `SurveyResponses_${surveyCode}.xlsx`);
    } else {
      alert("No data available to download.");
    }

    setLoading(false);
  };

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
      <Button onClick={downloadSurveyResponsesAsExcel}>Download Survey Responses as Excel</Button>
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
