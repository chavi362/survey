
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Survey from "./Survey";
import React from "react";
import useGetPaginationData from "../hooks/useGetPaginationData";
import { useSurvey } from "../components/SurveyContext";
import '../css/AllSurveys.css';

function AllSurveys() {
  let navigate = useNavigate();
  const { setSurvey } = useSurvey();
  const perPage = 10;
  const [page, setPage] = useState(1);
  const [allSurveys, setAllSurveys] = useState([]);
  const [
    data,
    error,
    loading,
    setLoading,
    prevPage,
    setPrevPage,
    nextPage,
    setNextPage,
  ] = useGetPaginationData(`surveys/not-answered?&page=${page}&limit=${perPage}`);

  useEffect(() => {
    if (error) {
      console.error("Error fetching surveys:", error);
    } else if (data) {
      let surveys = data.surveys;
      let tempSurveys = [...allSurveys, ...surveys];
      setAllSurveys(tempSurveys);
    }
  }, [data, error]);

  const handleAnswer = (survey) => {
    setSurvey(survey);
    navigate(`/home/all-surveys/${survey.surveyCode}`, { state: { isManagerSeeing: false } });
  };

  return (
    <div>
      <div className="firstPadding"></div>
      <h1 className="addSurveyTitle">All Surveys</h1>
      
      {allSurveys.length === 0 ? (
        <p>No surveys available</p>
      ) : (
        <div className="surveys-container">
          {allSurveys.map((survey, index) => (
            <section className="card singel-survey" key={index}>
              <Survey survey={survey} />
              <button className="btn btn-light" onClick={() => handleAnswer(survey)}>
                Answer
              </button>
            </section>
          ))}
        </div>
      )}
      
      {nextPage && (
        <button className="finishBtn moreSurveysBtn" onClick={() => setPage(page + 1)}>
          Load More
        </button>
      )}
    </div>
  );
}

export default AllSurveys;
