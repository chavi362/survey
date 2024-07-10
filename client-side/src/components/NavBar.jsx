import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import Cookies from 'js-cookie'; 

const NavBar = () => {
    const user = useContext(UserContext);
    let navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('token');
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <span className="nav-link" onClick={handleLogout}>Log Out</span>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login/Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/home/surveys">All surveys</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/home/create-survey">Create Survey</Link>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => navigate(`/surveys/${user.userCode}/surveys`)}>My Surveys</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;
