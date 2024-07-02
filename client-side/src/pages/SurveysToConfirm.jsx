import React from "react";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { serverRequests } from "../Api";
import { useSurvey } from "../components/SurveyContext";
import Survey from "./Survey";

const SurveysToConfirm = () => {
  const { setSurvey } = useSurvey();
  let getAmount = 10;
  const navigate = useNavigate();
  const [allSurveys, setAllSurveys] = useState([]);
  const [surveysAmount, setSurveysAmount] = useState();
  const [isMore, setIsMore] = useState(true);
  const [numOfSurveys, setNumOfSurveys] = useState(0);

  useEffect(() => {
    getSurveys();
  }, []);

  // const getSurveysAmount = async () => {
  //   const url = "surveysToConfirm/amount";
  //   try {
  //     const response = await serverRequests("GET", url, null);
  //     console.log(response);
  //     if (!response.ok) {
  //       alert("לא עובד");
  //       return;
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     if (data.amount <= getAmount) {
  //       setIsMore(false);
  //     }
  //     setSurveysAmount(data.amount);
  //     getSurveys();
  //   } catch (error) {
  //     console.error("Error in getSurveysAmount function:", error);
  //     alert("שגיאה בשרת");
  //   }
  // };


  const getSurveys = async () => {
    const url = "allSurveys/surveysToConfirm";

    try {
      const response = await serverRequests("GET", url, null);
      if (!response.ok) {
        alert("אין סקרים!!");
        return;
      }

      const data = await response.json();
      console.log(data)
      setAllSurveys(data.surveys);
    } catch (error) {
      console.error("Error in log function:", error);
      alert("שגיאה בשרת");
    }
  };


  const handleView =  (survey) => {
    setSurvey(survey);
        navigate(`/surveys/${survey.surveyCode}`);
   
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
              <Survey survey = {survey} />
              <button className="navLinks linkBtn" onClick={() => handleView(survey)}>צפיה</button>
            </section>
          ))}
        </div>
      )}
      
    </div>

   
  );
};

export default SurveysToConfirm;
