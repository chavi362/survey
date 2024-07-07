import React from "react";
import ManagerSurveyItem from "./ManagerSurveyItem";

const ManagerSurveysList = ({ data }) => {
  return (
    <div>
      {data.map((survey) => (
        <ManagerSurveyItem key={survey.surveyCode} survey={survey} />
      ))}
    </div>
  );
};

export default ManagerSurveysList;
