import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManagerNav from "./ManagerNav";
import { serverRequests } from "../Api";
import Cookies from 'js-cookie';


function ManagerPage() {
  sessionStorage.setItem("isManager", true);
  const token = Cookies.get('token');
  let navigate = useNavigate();


  useEffect(() => {
      const checkAdmin = async () => {
      
          try {
              const response = await serverRequests("GET", "/users/admin", token);
              if (response.ok) {
                  const data = await response.json();
                  console.log(data)
                  if (!data.isAdmin) {
                      navigate("/");
                  }
              } else {
                  navigate("/");
              }
          } catch (error) {
              console.error("Error checking admin status:", error);
              navigate("/");
          }
      };

      checkAdmin();
  }, [navigate]);
  return (
    <div id='managerPage'>
      {/* <ManagerNav /> */}
      <div className='firstPadding'></div>
      <button className='navLinks linkBtn' onClick={() => { navigate("/manager/surveysToConfirm") }}>סקרים הממתינים לאישור</button>
    </div>
  );
}

export default ManagerPage;