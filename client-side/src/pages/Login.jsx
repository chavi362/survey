import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverRequests } from "../Api";
import Cookies from 'js-cookie';
import '../css/Login.css';

function LogIn() {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const log = async () => {
    if (userEmail == "" || userPassword == "") {
      alert("חובה למלא את כל הפרטים!");
      return;
    }

    const url = "login";
    const body = {
      userEmail: userEmail,
      userPassword: userPassword,
    };


    try {
      const response = await serverRequests("POST", url, body);
      if (!response.ok) {
        alert("משתמש לא קיים או שאחד הפרטים שגויים ");
        return;
      }

      const data = await response.json();
      Cookies.set('token', data.token, { expires: 1 });

      sessionStorage.setItem("userCode", data.userCode);
      if (data.user.role === "admin") {
        navigate("/managerPage");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error in log function:", error);
      alert("שגיאה בשרת");
    }
  };

  return (
    <div>
      <h1 className="webTitle">סקרים</h1>
      <div className="logInBox">
        <h1 className="logIn">משתמש קיים</h1>
        <input
          type="text"
          placeholder="הכנס כתובת אימייל"
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="הכנס סיסמא"
          onChange={(event) => {
            setUserPassword(event.target.value);
          }}
        />
        <br />
        <div className="submitBtn">
          <button id="logInBtn" className="logInBtn" onClick={log}>
            היכנס
          </button>
          <button
            className="logInBtn"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            משתמש חדש
          </button>
        </div>
      </div>
    </div>)
}

export default LogIn;
