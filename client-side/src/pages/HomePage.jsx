import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import '../css/HomePage.css';

const HomePage = () => {
  let navigate = useNavigate();
  const user = useContext(UserContext);

  return (
    <div>
      <nav className="navbar">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">Log Out</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/surveys">Surveys</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">Users</Link>
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

      <div className="home-container flex text-white mt-24">
        <h1 className="title text-4xl font-bold mb-8">Welcome Survey Management:)</h1>
        <div className="about">
          <section className="mb-8">
            <h2 className="text-2xl font-bold">About the Project:</h2>
            <p>
              The goal of the project is to allow users to manage surveys easily and efficiently...
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold">Surveys:</h2>
            <p>In this page, you can create and manage surveys...</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold">Users:</h2>
            <p>In this page, you can manage users in the system...</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold">Login/Register:</h2>
            <p>
              In this page, you can login if you already have an account or register for a new one...
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold">About Surveys:</h2>
            <p>
              The Survey Management System is designed to streamline the process of creating, distributing, and analyzing surveys...
            </p>
            <p>
              Our platform provides intuitive tools for survey creation, robust user management features, and powerful analytics...
            </p>
            <p>
              Whether you're a business looking to gather customer feedback or an organization conducting employee surveys, our system is tailored to meet your needs...
            </p>
          </section>
        </div>
      </div>

      <footer className="mt-8">
        <p>Project developed by havi and avital</p>
      </footer>
    </div>
  );
};

export default HomePage;