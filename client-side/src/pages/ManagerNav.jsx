import React, { useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function ManagerORUser() {
    let navigate = useNavigate();

    return (
        <div>
            <div className='nav'>
                <button className='navLinks linkBtn' onClick={() => { navigate("/home/") }}>היכנס כמשתמש</button>
                <button className='navLinks linkBtn' onClick={() => { navigate("/managerPage") }}>ראשי</button>
                <button className='navLinks linkBtn' onClick={() => { navigate("/manager/allSurveys/") }}>כל הסקרים</button>
                <button className='navLinks linkBtn' onClick={() => { Cookies.remove('userCode'); navigate("/") }}>יציאה</button>
            </div>
        </div>
    );
}

export default ManagerORUser;
