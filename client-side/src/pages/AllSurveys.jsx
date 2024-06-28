import { useState, useEffect } from "react";
import { serverRequests } from "../Api";
import ManagerNav from "./ManagerNav";
import Survey from "./Survey";
import React from "react";



function AllSurveys() {
  let getAmount = 10;
  const [allSurveys, setAllSurveys] = useState([]);
  const [surveysAmount, setSurveysAmount] = useState();
  const [isMore, setIsmore] = useState(true);
  const [numOfSurveys, setNumOfSurveys] = useState(0);
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    getSurveysAmount();
  }, []);

  const getSurveysAmount = async () => {
    const url = "allSurveys/amount";
    try {
      const response = await serverRequests("GET", url, null);
      console.log(response);
      if (!response.ok) {
        alert("לא עובד");
        return;
      }
      const data = await response.json();
      console.log(data);
      if (data.amount <= getAmount) {
        setIsMore(false);
      }
      setSurveysAmount(data.amount);
      getSurveys();
    } catch (error) {
      console.error("Error in getSurveysAmount function:", error);
      alert("שגיאה בשרת");
    }
  };

  const getSurveys = async () => {
    const url = "allSurveys";
    const body = {
      getAmount: getAmount,
      numOfSurveys: numOfSurveys,
    };

    try {
      const response = await serverRequests("POST", url, body);
      console.log(response)
      if (!response.ok) {
        alert("אין סקרים!!");
        return;
      }
      const data = await response.json();
      console.log(data)
      let surveys = data.surveys;
      let tempSurveys = [...allSurveys];
      tempSurveys = [...tempSurveys, ...surveys];
      if (tempSurveys.length == surveysAmount) {
        setIsmore(false);
      }
      setNumOfSurveys(numOfSurveys + getAmount);
      setAllSurveys(tempSurveys);
    } catch (error) {
      console.error("Error in log function:", error);
      alert("שגיאה בשרת");
    }
  };

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


      {/* {allSurveys.map((survey, i) => {
        return (
          <div id="reportLink">
            <button
              className="linkToSurveys"
              onClick={() => {
                changeFlags(i);
              }}
            >
              {survey.surveyTitle}
            </button>
            {flags[i] && (
              <div className="ShowSurvey">
                <ShowSurvey survey={survey} isManager="true" />
              </div>
            )}
          </div>
        );
      })} */}
      {isMore && 
        <button className="finishBtn moreSurveysBtn" onClick={getSurveys}>
          <p>עוד</p>
          </button>
      }
    </div>
  );
}

export default AllSurveys;
