import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverRequests } from "../Api";
import Cookies from 'js-cookie';
import '../css/Login.css';

function LogIn() {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const log = async () => {
    if (userName === "" || userPassword === "") {
      alert("חובה למלא את כל הפרטים!");
      return;
    }

    const url = "login";
    const body = {
      userName: userName,
      userPassword: userPassword,
    };
    try {
      const response = await serverRequests("POST", url, body);
      if (!response.ok) {
        alert("משתמש לא קיים או שאחד הפרטים שגויים ");
        return;
      }
      const data = await response.json();
      console.log(data)
      Cookies.set('token', data.token, { expires: 1 });
      Cookies.set('userCode', data.userCode, { expires: 1 });
      if (data.role === "admin") {
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
          placeholder="הכנס שם משתמש"
          onChange={(event) => setUserName(event.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="הכנס סיסמא"
          onChange={(event) => setUserPassword(event.target.value)}
        />
        <br />
        <div className="submitBtn">
          <button id="logInBtn" className="logInBtn" onClick={log}>
            היכנס
          </button>
          <button
            className="logInBtn"
            onClick={() => navigate("/register")}
          >
            משתמש חדש
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
