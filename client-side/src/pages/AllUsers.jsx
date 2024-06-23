import React from "react";
import { useState, useEffect } from "react";
import { serverRequests } from "../Api";

const AllUsers = () => {
  let getAmount = 10;

  const [allUsers, setAllUsers] = useState([]);
  const [usersAmount, setUsersAmount] = useState();
  const [isMore, setIsmore] = useState(true);
  const [numOfUsers, setNumOfUsers] = useState(0);
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    getUsersAmount();
  }, []);

  const getUsersAmount = async () => {
    const url = "allUsers/amount";
    try {
      const respons = await serverRequests("GET", url, null);
      console.log(response);
      if (!response.ok) {
        alert("לא עובד");
        return;
      }

      const data = await response.json();
      if (data.amount <= getAmount) {
        setIsmore(false);
        setUsersAmount(amount);
      }
    } catch (error) {
      console.error("Error in log function:", error);
      alert("שגיאה בשרת");
    }
  };

  return (
    <div>
      All users:
      <div>{usersAmount}</div>
    </div>
  );
};

export default AllUsers;
