import React from 'react';

const SurveyToConfirm = ({survey}) => {
    console.log(survey);
  return (
    <div>
      <span>{survey.surveyTitle}</span>
              <button onClick={() => handleView(survey.surveyCode)}>צפיה</button>
              <button onClick={() => handleApprove(survey.surveyCode)}>אשר</button>
    </div>
  )
}

export default SurveyToConfirm;
