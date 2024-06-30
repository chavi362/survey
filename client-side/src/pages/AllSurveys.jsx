import { useState, useEffect } from "react";
import { serverRequests } from "../Api";
import ManagerNav from "./ManagerNav";
import Survey from "./Survey";
import React from "react";
import useGetPaginationData from "../hooks/useGetPaginationData"



function AllSurveys() {
  const perPage = 10;
  const [page, setPage] = useState(1);
  const [allSurveys, setAllSurveys] = useState([]);
  const [data, error, loading, setLoading, prevPage, setPrevPage, nextPage, setNextPage] = useGetPaginationData(`allSurveys?&page=${page}&limit=${perPage}`);
  useEffect(() => {
    if (error) {
        console.error('Error fetching photos:', error);
    } else if (data) {
      let surveys = data.surveys;
      let tempSurveys = [...allSurveys];
      tempSurveys = [...tempSurveys, ...surveys];
      setAllSurveys(tempSurveys)
    }
}, [data, error]);


  return (
    <div>
      <ManagerNav />
      <div className="firstPadding"></div>
      <h1 className="addSurveyTitle">כל הסקרים</h1>

      {allSurveys.length === 0 ? (
        <p>No surveys available</p>
      ) : (
        <ul>
          {allSurveys.map((survey) => (
            <li key={survey.surveyCode}>
              <Survey survey = {survey} />
            </li>
          ))}
        </ul>
      )}

      {nextPage && 
        <button className="finishBtn moreSurveysBtn" onClick={getSurveys}>
          <p>עוד</p>
          </button>
      }
    </div>
  );
}

export default AllSurveys;
