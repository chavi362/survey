CREATE DATABASE SurveyManagement;

USE SurveyManagement;

CREATE TABLE users (
    userCode INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    ageID INT,
    genderID INT,
    areaID INT,
    sectorID INT,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

CREATE TABLE passwords (
    user_id INT PRIMARY KEY,
    user_password VARCHAR(255),
    FOREIGN KEY (user_id) 
      REFERENCES users (userCode) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);

CREATE TABLE ages (
    ageID INT AUTO_INCREMENT PRIMARY KEY,
    startYear INT NOT NULL,
    endYear INT NOT NULL
);

CREATE TABLE areas (
    areaID INT AUTO_INCREMENT PRIMARY KEY,
    area VARCHAR(255) NOT NULL
);

CREATE TABLE genders (
    genderID INT AUTO_INCREMENT PRIMARY KEY,
    gender VARCHAR(255) NOT NULL
);

CREATE TABLE sectors (
    sectorID INT AUTO_INCREMENT PRIMARY KEY,
    sector VARCHAR(255) NOT NULL
);

CREATE TABLE surveyanswers (
    answerCode INT AUTO_INCREMENT PRIMARY KEY,
    questionCode INT NOT NULL,
    answer TEXT NOT NULL
);

CREATE TABLE surveys (
    surveyCode INT AUTO_INCREMENT PRIMARY KEY,
    surveyTitle VARCHAR(255) NOT NULL,
    userCode INT NOT NULL,
    report TEXT,
    showResults BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (userCode) REFERENCES users(userCode)
);

CREATE TABLE surveysquestions (
    questionCode INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    surveyCode INT NOT NULL,
    FOREIGN KEY (surveyCode) REFERENCES surveys(surveyCode)
);

CREATE TABLE surveydata (
    surveyDataCode INT AUTO_INCREMENT PRIMARY KEY,
    userCode INT NOT NULL,
    answerCode INT NOT NULL,
    FOREIGN KEY (userCode) REFERENCES users(userCode),
    FOREIGN KEY (answerCode) REFERENCES surveyanswers(answerCode)
);


-- הוספת משתמשים
INSERT INTO users (username, email, name, ageID, genderID, areaID, sectorID, role) VALUES
('user1', 'user1@example.com', 'User One', 1, 1, 1, 1, 'user'),
('user2', 'user2@example.com', 'User Two', 2, 2, 2, 2, 'user'),
('admin', 'admin@example.com', 'Admin User', 3, 1, 3, 1, 'admin');

-- הוספת סיסמאות למשתמשים
INSERT INTO passwords (user_id, user_password) VALUES
(1, 'password1'),
(2, 'password2'),
(3, 'adminpassword');

-- הוספת גילאים
INSERT INTO ages (startYear, endYear) VALUES
(1990, 2000),
(2001, 2010),
(2011, 2020);

-- הוספת אזורים
INSERT INTO areas (area) VALUES
('North'),
('Center'),
('South');

-- הוספת מגדרים
INSERT INTO genders (gender) VALUES
('Male'),
('Female');

-- הוספת מגזרים
INSERT INTO sectors (sector) VALUES
('Public'),
('Private');

-- הוספת סקרים
INSERT INTO surveys (surveyTitle, userCode, report, showResults) VALUES
('Customer Satisfaction Survey', 1, 'Annual customer satisfaction survey', TRUE),
('Employee Feedback Survey', 2, 'Quarterly employee feedback survey', TRUE);

-- הוספת שאלות לסקרים
INSERT INTO surveysquestions (question, surveyCode) VALUES
('How satisfied are you with our service?', 1),
('Would you recommend our company to others?', 1),
('How do you rate your work-life balance?', 2),
('Do you feel valued at work?', 2);

-- הוספת תשובות לשאלות
INSERT INTO surveyanswers (questionCode, answer) VALUES
(1, 'Very satisfied'),
(1, 'Satisfied'),
(1, 'Neutral'),
(1, 'Dissatisfied'),
(1, 'Very dissatisfied'),
(2, 'Yes, definitely'),
(2, 'Maybe'),
(2, 'No'),
(3, 'Excellent'),
(3, 'Good'),
(3, 'Average'),
(3, 'Poor'),
(4, 'Yes, very much'),
(4, 'Somewhat'),
(4, 'Not really'),
(4, 'Not at all');

-- הוספת תשובות של משתמשים לסקרים
INSERT INTO surveydata (userCode, answerCode) VALUES
(1, 1), -- user1 answered 'Very satisfied' to question 1
(1, 6), -- user1 answered 'Yes, definitely' to question 2
(2, 10), -- user2 answered 'Good' to question 3
(2, 13); -- user2 answered 'Yes, very much' to question 4