import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../hooks/useGetData";

const ManagerSurveyItem = ({ survey }) => {
    const [data, error, loading] = useGetData(`surveys/${survey.surveyCode}/responses/numberOfResponses`);
    const [numberOfResponses, setNumberOfResponses] = useState(0);
    useEffect(() => {
        if (error) {
          console.error('Error fetching surveys:', error);
        } else if (data) {
            console.log(data);
            setNumberOfResponses(data.surveys);
         
        }
      }, [data, error]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div key={survey.surveyCode} className="survey-item">
      <h3>{survey.surveyTitle}</h3>
      <p>Confirmed: {survey.confirmed ? "Yes" : "No"}</p>
      <p>Number of Responses: {numberOfResponses}</p>
      {numberOfResponses > 0 && (
        <Link to={`/survey/${survey.surveyCode}/responses`}>View Responses</Link>
      )}
    </div>
  );
};

export default ManagerSurveyItem;
