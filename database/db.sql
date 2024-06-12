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
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    educationID INT,
    incomeID INT,
    FOREIGN KEY (educationID) REFERENCES education_levels (educationID) ON UPDATE RESTRICT ON DELETE SET NULL,
    FOREIGN KEY (incomeID) REFERENCES family_income_levels (incomeID) ON UPDATE RESTRICT ON DELETE SET NULL,
    FOREIGN KEY (ageID) REFERENCES ages (ageID) ON UPDATE RESTRICT ON DELETE SET NULL,
    FOREIGN KEY (genderID) REFERENCES genders (genderID) ON UPDATE RESTRICT ON DELETE SET NULL,
    FOREIGN KEY (areaID) REFERENCES areas (areaID) ON UPDATE RESTRICT ON DELETE SET NULL,
    FOREIGN KEY (sectorID) REFERENCES sectors (sectorID) ON UPDATE RESTRICT ON DELETE SET NULL
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

CREATE TABLE family_income_levels (
    incomeID INT AUTO_INCREMENT PRIMARY KEY,
    startRange INT NOT NULL,
    endRange INT NOT NULL
);

CREATE TABLE genders (
    genderID INT AUTO_INCREMENT PRIMARY KEY,
    gender VARCHAR(255) NOT NULL
);

CREATE TABLE education_levels (
    educationID INT AUTO_INCREMENT PRIMARY KEY,
    education_level VARCHAR(255) NOT NULL
);

CREATE TABLE sectors (
    sectorID INT AUTO_INCREMENT PRIMARY KEY,
    sector VARCHAR(255) NOT NULL
);

CREATE TABLE surveys (
    surveyCode INT AUTO_INCREMENT PRIMARY KEY,
    surveyTitle VARCHAR(255) NOT NULL,
    managerCode INT NOT NULL,
    report TEXT,
    showResults BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (managerCode) REFERENCES users(userCode) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE surveysquestions (
    questionCode INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    surveyCode INT NOT NULL,
    FOREIGN KEY (surveyCode) REFERENCES surveys(surveyCode) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE surveyCloseAnswers (
    answerCode INT AUTO_INCREMENT PRIMARY KEY,
    questionCode INT NOT NULL,
    answer TEXT NOT NULL,
    FOREIGN KEY (questionCode) REFERENCES surveysquestions(questionCode) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE surveyOpenAnswers (
    answerCode INT AUTO_INCREMENT PRIMARY KEY,
    questionCode INT NOT NULL,
    answer TEXT NOT NULL,
    userCode INT NOT NULL,
    FOREIGN KEY (userCode) REFERENCES users(userCode) ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (questionCode) REFERENCES surveysquestions(questionCode) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE surveyCloseData (
    surveyDataCode INT AUTO_INCREMENT PRIMARY KEY,
    userCode INT NOT NULL,
    answerCode INT NOT NULL,
    FOREIGN KEY (userCode) REFERENCES users(userCode) ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (answerCode) REFERENCES surveyCloseAnswers(answerCode) ON UPDATE RESTRICT ON DELETE CASCADE
);



INSERT INTO education_levels (education_level) VALUES ('תיכונית');
INSERT INTO education_levels (education_level) VALUES ('על תיכונית');
INSERT INTO education_levels (education_level) VALUES ('תואר ראשון');
INSERT INTO education_levels (education_level) VALUES ('תואר שני');
INSERT INTO education_levels (education_level) VALUES ('תואר שלישי');
-- הוספת משתמשים
-- Insert statements for education levels
INSERT INTO education_levels (education_level) VALUES 
('תיכונית'), 
('על תיכונית'), 
('תואר ראשון'), 
('תואר שני'), 
('תואר שלישי');

-- Insert statements for users
INSERT INTO users (username, email, name, ageID, genderID, areaID, sectorID, role, educationID, incomeID) VALUES
('user1', 'user1@example.com', 'User One', 1, 1, 1, 1, 'user', 1, 1),
('user2', 'user2@example.com', 'User Two', 2, 2, 2, 2, 'user', 2, 2),
('admin', 'admin@example.com', 'Admin User', 3, 1, 3, 1, 'admin', 3, 3);

-- Insert statements for ages
INSERT INTO ages (startYear, endYear) VALUES
(16, 18),
(18, 25),
(25, 35);

-- Insert statements for passwords
INSERT INTO passwords (user_id, user_password) VALUES
(1, 'password1'),
(2, 'password2'),
(3, 'adminpassword');

-- Insert statements for areas
INSERT INTO areas (area) VALUES
('North'),
('Center'),
('South');

-- Insert statements for family income levels
INSERT INTO family_income_levels (startRange, endRange) VALUES
(0, 1500),
(1500, 4000),
(4000, 8000);

-- Insert statements for genders
INSERT INTO genders (gender) VALUES
('Male'),
('Female');

-- Insert statements for sectors
INSERT INTO sectors (sector) VALUES
('Public'),
('Private');

-- Insert statements for surveys
INSERT INTO surveys (surveyTitle, managerCode, report, showResults) VALUES
('Customer Satisfaction Survey', 1, 'Annual customer satisfaction survey', TRUE),
('Employee Feedback Survey', 2, 'Quarterly employee feedback survey', TRUE);

-- Insert statements for survey questions
INSERT INTO surveysquestions (question, surveyCode) VALUES
('How satisfied are you with our service?', 1),
('Would you recommend our company to others?', 1),
('How do you rate your work-life balance?', 2),
('Do you feel valued at work?', 2);

-- Insert statements for survey close answers
INSERT INTO surveyCloseAnswers (questionCode, answer) VALUES
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

-- Insert statements for survey close data
INSERT INTO surveyCloseData (userCode, answerCode) VALUES
(1, 1), -- user1 answered 'Very satisfied' to question 1
(1, 6), -- user1 answered 'Yes, definitely' to question 2
(2, 10), -- user2 answered 'Good' to question 3
(2, 13); -- user2 answered 'Yes, very much' to question 4

-- Insert statements for survey open answers
INSERT INTO surveyOpenAnswers (questionCode, answer, userCode) VALUES
(1, 'Open-ended answer from user1 for question 1', 1),
(2, 'Open-ended answer from user2 for question 2', 2);
