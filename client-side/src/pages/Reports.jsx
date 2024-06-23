import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import UserShowSurvey from "./UserShowSurvey";
// import ManagerShowSurvey from "./ManagerShowSurvey";

function Reports() {
    const [reports, setReports] = useState([]);
    const [flagReports, setFlagReports] = useState(false);
    const[flags,setFlags]=useState([]);
    useEffect(() => {
        getReports();
    }, []);

    const getReports = async () => {
        debugger;
        let myReports = await fetch("http://localhost:3569/mySurveys/reports");
        myReports = await myReports.json();
        initFlags(myReports.length);
        setReports(myReports);
        debugger;
    }
    const initFlags = (size) => {
        let myFlags = [...flags];
        for (let i = 0; i < size; i++) {
          myFlags.push(false);
        }
        setFlags(myFlags);
      }
      let changeFlags = (i) => {
        let tempFlags=[...flags];
        tempFlags[i]=! tempFlags[i];
        setFlags(tempFlags);
       
      }
    return (
        <div>
            <button className='report' disabled={!reports.length} onClick={() => { debugger; setFlagReports(!flagReports); }}>{reports.length} דיווחים</button>
            {flagReports && <div>{reports.map((report,i) => {
                return (<div id="reportLink">
              
                     <button class="linkToSurveys" onClick={()=>{changeFlags(i)}}> {report.surveyTitle}</button>
            {
              flags[i] && <ManagerShowSurvey survey={report}/>
            }
                </div>);
            })}</div>}
        </div>
    );
}

export default Reports;