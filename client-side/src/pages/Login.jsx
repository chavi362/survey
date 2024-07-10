
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverRequests } from "../Api";
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';

function LogIn({ updateUserContext }) {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const log = async () => {
    if (userName === "" || userPassword === "") {
      alert("All fields must be filled out!");
      return;
    }

    const url = "login";
    const body = { userName, userPassword };
    try {
      const response = await serverRequests("POST", url, body);
      if (!response.ok) {
        alert("User does not exist or incorrect details");
        return;
      }
      const data = await response.json();
      console.log(data);
      const userContextData = { userCode: data.userCode };
      updateUserContext(userContextData);
      Cookies.set('token', data.token, { expires: 1 });

      if (data.role === "admin") {
        navigate("/managerPage");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error in log function:", error);
      alert("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
      
        <h2 className="text-center mb-4">Existing User</h2>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Enter Username"
            onChange={(event) => setUserName(event.target.value)}
          />
          <label htmlFor="floatingInput">Enter Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Enter Password"
            onChange={(event) => setUserPassword(event.target.value)}
          />
          <label htmlFor="floatingPassword">Enter Password</label>
        </div>
        <div className="text-center pt-1 mb-5 pb-1">
          <button
            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 sign-up-btn"
            onClick={log}
          >
            Log In
          </button>
        </div>
        <div className="d-flex align-items-center justify-content-center pb-4">
          <button
            className="login-btn-su"
            onClick={() => navigate("/register")}
          >
            New User
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
