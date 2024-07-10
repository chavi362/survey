
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CloseQuestionResponse from '../components/CloseQuestionResponse';
import OpenQuestionResponse from '../components/OpenQuestionResponse';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { serverRequests } from '../Api';
import useGetData from '../hooks/useGetData';
import FilterComponent from '../components/FilterComponent';
import NavBar from '../components/NavBar';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  const fetchAndPrepareData = async () => {
    let data = [];
    for (const question of questions) {
      try {
        const response = await serverRequests("POST", `surveys/${surveyCode}/responses/${question.questionCode}/filtered-responses`, {
          questionType: question.questionType,
          filters
        });
        const responseData = await response.json();
        if (responseData.length > 0) {
          const questionData = responseData.map(response => ({
            question: question.question,
            answer: response.answer,
            numberOfResponses: response.numberOfResponses
          }));
          data.push({ question: question.question, data: questionData });
        }
      } catch (err) {
        setError(err.message);
        console.error(`Error fetching responses for question ${question.questionCode}:`, err);
      }
    }
    return data;
  };

  const downloadSurveyResponsesAsExcel = async () => {
    setLoading(true);
    const workbook = XLSX.utils.book_new();
    const data = await fetchAndPrepareData();

    if (data.length > 0) {
      data.forEach(({ question, data: questionData }) => {
        const worksheet = XLSX.utils.json_to_sheet(questionData.map(d => ({
          Answer: d.answer,
          NumberOfResponses: d.numberOfResponses
        })));
        const sanitizedSheetName = sanitizeSheetName(question);
        XLSX.utils.book_append_sheet(workbook, worksheet, sanitizedSheetName);
      });
      XLSX.writeFile(workbook, `SurveyResponses_${surveyCode}.xlsx`);
    } else {
      alert("No data available to download.");
    }
    setLoading(false);
  };

  const downloadSurveyResponsesAsPDF = async () => {
    setLoading(true);
    const doc = new jsPDF();
    const data = await fetchAndPrepareData();
    let pageAdded = false;
    if (data.length > 0) {
      data.forEach(({ question, data: questionData }) => {
        if (pageAdded) {
          doc.addPage();
        }
        doc.text(question, 10, 10);
        doc.autoTable({
          head: [['Answer', 'Number Of Responses']],
          body: questionData.map(d => [d.answer, d.numberOfResponses]),
        });
        pageAdded = true;
      });
      doc.save(`SurveyResponses_${surveyCode}.pdf`);
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
    <div>
      <NavBar/>
    <Container className='survey-responses'>
      <h2>Survey Responses for {surveyTitle}</h2>
      <p>Number of Responses: {numberOfResponses}</p>
      <Button onClick={downloadSurveyResponsesAsExcel}>Download Survey Responses as Excel</Button>
      <Button onClick={downloadSurveyResponsesAsPDF} className="ms-2">Download Survey Responses as PDF</Button>
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
    </div>
  );
};

export default SurveyResponses;
