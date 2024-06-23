import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import ManagerShowSurvey from "./ManagerShowSurvey";
// import ShowSurvey from "./ShowSurvey";
import ManagerNav from "./ManagerNav"
import React from 'react'
function AllSurveys() {
  let getAmount = 10;

  const [allSurveys, setAllSurveys] = useState([]);
  const [surveyAmount, setSurveyAmount] = useState();
  const [isMore, setIsmore] = useState(true);
  const [numOfSurveys, setNumOfSurveys] = useState(0);
  const[flags,setFlags]=useState([]);

  useEffect(() => {
    getSurveyAmount();
  }, []);

  const getSurveyAmount = async () => {
    let amount = await fetch("http://localhost:3569/mySurveys/allSurveys/amount");
    amount = await amount.json();
    if (amount <= getAmount) {
      setIsmore(false);
    }
    setSurveyAmount(amount);
    getSurveys();
 
  }

 
  const getSurveys = async () => {
    debugger;
    let surveys = await fetch("http://localhost:3569/mySurveys/allSurveys", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "getAmount": getAmount, "numOfSurveys": numOfSurveys })
    });
    surveys = await surveys.json();
    let tempSurveys = [...allSurveys];
    tempSurveys = [...tempSurveys, ...surveys];
    if (tempSurveys.length == surveyAmount) {
      setIsmore(false);
    }
    updateFlags();
    setNumOfSurveys(numOfSurveys+getAmount);
    setAllSurveys(tempSurveys);
 
  }
const updateFlags=()=>{
  let newFlags=[];
  
  for(let i=0;i<getAmount;i++)
  {
    newFlags.push(false);
  }
  let tempFlags=[...flags,...newFlags];
  setFlags(tempFlags);
}
let changeFlags = (i) => {
  let tempFlags=[...flags];
  tempFlags[i]=! tempFlags[i];
  setFlags(tempFlags);
}
  return (

    <div >
      <ManagerNav/>
      <div className="firstPadding"></div>
      <h1 className='addSurveyTitle'>
        כל הסקרים
      </h1>
      {allSurveys.map((survey,i) => {
                  return (<div id="reportLink">
                   <button class="linkToSurveys" onClick={()=>{changeFlags(i)}}>{survey.surveyTitle}</button>
          {
            flags[i] && <div class="ShowSurvey"><ShowSurvey survey={survey} isManager="true"/></div>
          }
              </div>);

      })}
         <button className="finishBtn moreSurveysBtn" disabled={!isMore} onClick={getSurveys}><p>עוד</p></button>
    </div>
  );
}

export default AllSurveys;