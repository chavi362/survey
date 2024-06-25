import React from "react";
import { useState, useEffect } from "react";
import { serverRequests } from "../Api";
import Survey from "./Survey";

const SurveysToConfirm = () => {
  let getAmount = 10;

  const [allSurveys, setAllSurveys] = useState([]);
  const [surveysAmount, setSurveysAmount] = useState();
  const [isMore, setIsMore] = useState(true);
  const [numOfSurveys, setNumOfSurveys] = useState(0);
  // const [flags, setFlags] = useState([]);

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
    const body = {
      getAmount: getAmount,
      numOfSurveys: numOfSurveys,
    };

    try {
      const response = await serverRequests("POST", url, body);
      if (!response.ok) {
        alert("אין סקרים!!");
        return;
      }

      const data = await response.json();
      setAllSurveys(data.surveys);
    if (data.surveys.length >= surveysAmount) {
      setIsmore(false);
    }
    // updateFlags();
    setNumOfSurveys(numOfSurveys+getAmount);
    //setAllSurveys(tempSurveys);
    } catch (error) {
      console.error("Error in log function:", error);
      alert("שגיאה בשרת");
    }
  };



// const updateFlags=()=>{
//   let newFlags=[];
  
//   for(let i=0;i<getAmount;i++)
//   {
//     newFlags.push(false);
//   }
//   let tempFlags=[...flags,...newFlags];
//   setFlags(tempFlags);
// }
// let changeFlags = (i) => {
//   let tempFlags=[...flags];
//   tempFlags[i]=! tempFlags[i];
//   setFlags(tempFlags);
// }


 

  return (

<div>
      <h1>Surveys To Confirm:</h1>
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
      {isMore && <button className="finishBtn moreSurveysBtn" onClick={getSurveys}><p>טען עוד</p></button>}
      
    </div>

   
  );
};

export default SurveysToConfirm;
