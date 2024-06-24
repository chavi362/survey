import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { serverRequests } from "../Api";

const SurveyToConfirm = ({ survey }) => {
  console.log(survey);
  let navigate = useNavigate();
  const [surveyData, setSurveyData] = useState(null);

  const handleView = async (surveyCode) => {
    const url = `surveysToConfirm/${surveyCode}`;
    try {
      const response = await serverRequests("GET", url, null);
      console.log(response);
      if (!response.ok) {
        alert("לא עובד");
        return;
      }
      const data = await response.json();
      console.log("some data");
      console.log(data);
      console.log(data.survey);
      setSurveyData(data.survey);
      navigate(`/manager/surveysToConfirm/${surveyCode}`, {
        state: { survey: data.survey },
      });
    } catch (error) {
      console.error("There was an error fetching the survey data!", error);
    }
  };


  const handleApprove = async (surveyCode) => {
    const confirmApproval = window.confirm("האם אתה בטוח שברצונך לאשר את הסקר?");
    if (confirmApproval) {
      const url = `surveysToConfirm/${surveyCode}`;
      try {
        const response = await serverRequests("PUT", url, { surveyCode: surveyCode ,confirmed: true });
        console.log(response);
        if (!response.ok) {
          alert("לא עובד");
          return;
        }
        alert("הסקר אושר בהצלחה");
      } catch (error) {
        console.error("There was an error updating the survey!", error);
      }
    }
  };

  return (
    <div>
      <span>{survey.surveyTitle}</span>
      <button className="navLinks linkBtn" onClick={() => handleView(survey.surveyCode)}>צפיה</button>
      <button className="navLinks linkBtn" onClick={() => handleApprove(survey.surveyCode)}>אשר</button>
    </div>
  );
};

export default SurveyToConfirm;
