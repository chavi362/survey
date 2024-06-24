import React from 'react'
import {
    BrowserRouter as Router,
    useNavigate
} from "react-router-dom";
import { useEffect } from "react";
function ManagerORUser() {
    let navigate = useNavigate();
    useEffect(() => {
        if (!sessionStorage.getItem("userCode"))
            navigate("/");
    }, [])

    return (
        <div>
        <div className='nav' >
            <button className='navLinks linkBtn' onClick={() => { navigate("/home/") }}>היכנס כמשתמש</button>
            <button className='navLinks linkBtn' onClick={() => { navigate("/managerPage") }}>ראשי</button>
            <button className='navLinks linkBtn' onClick={() => { navigate("/manager/allSurveys/") }}>כל הסקרים</button>
            <button className='navLinks linkBtn' onClick={() => { sessionStorage.clear(); navigate("/") }}>יציאה</button>
        </div>
        </div>
    );
}

export default ManagerORUser;