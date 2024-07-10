import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function ManagerNav() {
    let navigate = useNavigate();

    return (
        <div>
            <nav className="navbar">

            <ul className="nav nav-tabs">
          <li className="nav-item">
            <span className="nav-link" onClick={() => { Cookies.remove('userCode'); navigate("/") }}>יציאה </span>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/manager/allSurveys/">כל הסקרים</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/managerPage">ראשי</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/home/">היכנס כמשתמש</Link>
          </li>
        </ul>
            </nav>
        </div>
    );
}

export default ManagerNav;
