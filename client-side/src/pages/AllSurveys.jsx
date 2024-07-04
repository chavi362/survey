import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverRequests } from "../Api";
import Survey from "./Survey";
import React from "react";
import useGetPaginationData from "../hooks/useGetPaginationData";
import { useSurvey } from "../components/SurveyContext";

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
  ] = useGetPaginationData(`allSurveys?&page=${page}&limit=${perPage}`);
  useEffect(() => {
    if (error) {
      console.error("Error fetching photos:", error);
    } else if (data) {
      let surveys = data.surveys;
      let tempSurveys = [...allSurveys];
      tempSurveys = [...tempSurveys, ...surveys];
      setAllSurveys(tempSurveys);
    }
  }, [data, error]);

  const handleAnswer = (survey) => {
    setSurvey(survey);
    console.log(`Answer survey with code ${survey.surveyCode}`);
    navigate(`/home/all-surveys/${survey.surveyCode}`);
  };

  return (
    <div>
      <div className="firstPadding"></div>
      <h1 className="addSurveyTitle">כל הסקרים</h1>

      {allSurveys.length === 0 ? (
        <p>No surveys available</p>
      ) : (
        <div>
          {allSurveys.map((survey, index) => (
            <section key={index}>
              <Survey survey={survey} />
              <button
                className="navLinks linkBtn"
                onClick={() => handleAnswer(survey)}
              >
                ענה
              </button>
            </section>
          ))}
        </div>
      )}

      {nextPage && (
        <button className="finishBtn moreSurveysBtn" onClick={getSurveys}>
          <p>עוד</p>
        </button>
      )}
    </div>
  );
}

export default AllSurveys;
