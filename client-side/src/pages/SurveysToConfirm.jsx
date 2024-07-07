import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverRequests } from "../Api";
import { useSurvey } from "../components/SurveyContext";
import Survey from "./Survey";

const SurveysToConfirm = () => {
  const { setSurvey } = useSurvey();
  const navigate = useNavigate();
  const [allSurveys, setAllSurveys] = useState([]);

  useEffect(() => {
    getSurveys();
  }, []);

  const getSurveys = async () => {
    const url = "surveys/surveysToConfirm";

    try {
      const response = await serverRequests("GET", url, null);
      if (!response.ok) {
        alert("אין סקרים!!");
        return;
      }

      const data = await response.json();
      setAllSurveys(data.surveys);
    } catch (error) {
      console.error("Error in log function:", error);
      alert("שגיאה בשרת");
    }
  };

  const handleView = (survey) => {
    setSurvey(survey);
    navigate(`/manager/surveysToConfirm/${survey.surveyCode}`, { state: { isManagerSeeing: true } });
  };

  return (
    <div>
      <h1>Surveys To Confirm:</h1>
      {allSurveys.length === 0 ? (
        <p>No surveys available</p>
      ) : (
        <div>
          {allSurveys.map((survey) => (
            <section key={survey.surveyCode}>
              <Survey survey={survey} />
              <button className="navLinks linkBtn" onClick={() => handleView(survey)}>צפיה</button>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveysToConfirm;
