import React from "react";
import { Link, useNavigate } from "react-router-dom";
//import "../css/HomePage.css";

const HomePage = () => {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to Survey Management System!</h1>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/surveys">Surveys</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/login">Login/Register</Link>
          </li>
        </ul>
      </nav>

      <section>
        <h2>About the Project:</h2>
        <p>
          The goal of the project is to allow users to manage surveys easily and
          efficiently...
        </p>
      </section>

      <section>
        <h2>Surveys:</h2>
        <p>In this page, you can create and manage surveys...</p>
      </section>

      <section>
        <h2>Users:</h2>
        <p>In this page, you can manage users in the system...</p>
      </section>

      <section>
        <h2>Login/Register:</h2>
        <p>
          In this page, you can login if you already have an account or register
          for a new one...
        </p>
      </section>

      <section>
        <h2>About Surveys:</h2>
        <p>
          The Survey Management System is designed to streamline the process of
          creating, distributing, and analyzing surveys...
        </p>
        <p>
          Our platform provides intuitive tools for survey creation, robust user
          management features, and powerful analytics...
        </p>
        <p>
          Whether you're a business looking to gather customer feedback or an
          organization conducting employee surveys, our system is tailored to
          meet your needs...
        </p>
      </section>
      <section>
        <button className='navLinks linkBtn' onClick={() => { navigate("/home/all-surveys") }}>כל הסקרים</button>
        <button className='navLinks linkBtn' onClick={() => { navigate("/home/craete-survey") }}>יצירת סקר </button>
        
      </section>
      <footer>
        <p>Project developed by havi and avital</p>
      </footer>
    </div>
  );
};

export default HomePage;
