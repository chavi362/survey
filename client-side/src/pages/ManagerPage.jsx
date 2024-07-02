import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AllSurveys from "./AllSurveys";
import { useNavigate } from "react-router-dom";
import ManagerNav from "./ManagerNav";
import SurveysToConfirm from './SurveysToConfirm';


function ManagerPage() {
  sessionStorage.setItem("isManager", true);
  let navigate = useNavigate();
  return (
    <div id='managerPage'>
      <ManagerNav />
      <div className='firstPadding'></div>
      <button className='navLinks linkBtn' onClick={() => { navigate("/manager/surveysToConfirm") }}>סקרים הממתינים לאישור</button>
    </div>
  );
}

export default ManagerPage;