import React from "react";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../components/SurveyContext";
import { serverRequests } from "../Api";

const Survey = ({ survey }) => {
    const navigate = useNavigate();
    const { setSurvey } = useSurvey();

    const handleAnswer = async (survey) => {
        try {
            setSurvey(survey);
            navigate(`/surveys/${survey.surveyCode}`);
        } catch (error) {
            console.error("There was an error fetching the survey data!", error);
        }
    };

    return (
        <div>
            <span>{survey.surveyTitle}</span>
            {/* <img src={`http://localhost:3000/images/${survey.imageUrl}`} alt={survey.surveyTitle} /> */}
            {/* <button className="navLinks linkBtn" onClick={() => handleAnswer(survey)}>ענה</button> */}
        </div>
    );
};

export default Survey;
