import React from "react";
import ManagerSurveyItem from "./ManagerSurveyItem";


const ManagerSurveysList = ({ data }) => {
  return (
    <div className="surveys-container">
      
      {data.map((survey, index) => (
        <section className="card singel-survey" key={index}>
        <ManagerSurveyItem key={survey.surveyCode} survey={survey} />
        </section>
      ))}
    </div>
  );
};

export default ManagerSurveysList;
