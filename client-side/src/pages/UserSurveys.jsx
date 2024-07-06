import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useGetData from "../hooks/useGetData";
import WithLoader from "../components/WithLoader";

const SurveysList = ({ data }) => {
  return (
    <div>
      {data.map((survey) => (
        <div key={survey.surveyCode} className="survey-item">
          <h3>{survey.surveyTitle}</h3>
          <p>Confirmed: {survey.confirmed ? "Yes" : "No"}</p>
          <p>Number of Responses: {survey.numberOfResponses}</p>
          {survey.numberOfResponses > 0 && (
            <Link to={`/survey/${survey.surveyCode}/responses`}>View Responses</Link>
          )}
        </div>
      ))}
    </div>
  );
};

const UserSurveys = () => {
  const { user } = useContext(UserContext);
  const [data, error, loading] = useGetData(`/surveys?managerCode=${user.id}`);


  if (error) return <div>Error: {error}</div>;

  return <SurveysList data={data} loading={loading} />;
};

export default WithLoader(UserSurveys);
