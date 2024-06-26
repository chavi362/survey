
DROP TABLE IF EXISTS surveyCloseData;
DROP TABLE IF EXISTS surveyOpenAnswers;
DROP TABLE IF EXISTS surveyCloseAnswers;
DROP TABLE IF EXISTS surveysquestions;
DROP TABLE IF EXISTS surveys;
DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS sectors;
DROP TABLE IF EXISTS education_levels;
DROP TABLE IF EXISTS genders;
DROP TABLE IF EXISTS family_income_levels;
DROP TABLE IF EXISTS areas;
DROP TABLE IF EXISTS ages;
-- Creating tables
CREATE DATABASE IF NOT EXISTS SurveyManagement;
USE SurveyManagement;

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

CREATE TABLE users (
    userCode INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
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

CREATE TABLE surveys (
    surveyCode INT AUTO_INCREMENT PRIMARY KEY,
    surveyTitle VARCHAR(255) NOT NULL,
    managerCode INT NOT NULL,
    report TEXT,
    imageUrl VARCHAR(500) DEFAULT NULL,
    confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (managerCode) REFERENCES users(userCode)
);

CREATE TABLE surveysquestions (
    questionCode INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    surveyCode INT NOT NULL,
    questionType ENUM('open', 'close') NOT NULL,
    FOREIGN KEY (surveyCode) REFERENCES surveys(surveyCode)
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

-- Inserting data into ages table
INSERT INTO ages (startYear, endYear) VALUES 
(1980, 1985), 
(1986, 1990), 
(1991, 1995), 
(1996, 2000), 
(2001, 2005);

-- Inserting data into areas table
INSERT INTO areas (area) VALUES 
('תל אביב'),
('ירושלים'),
('חיפה'),
('באר שבע'),
('אשדוד');

-- Inserting data into family_income_levels table
INSERT INTO family_income_levels (startRange, endRange) VALUES 
(5000, 10000), 
(10001, 15000), 
(15001, 20000), 
(20001, 25000), 
(25001, 30000);

-- Inserting data into genders table
INSERT INTO genders (gender) VALUES 
('זכר'),
('נקבה');

-- Inserting data into education_levels table
INSERT INTO education_levels (education_level) VALUES 
('תיכון'),
('תעודה מקצועית'),
('תואר ראשון'),
('תואר שני'),
('דוקטורט');

-- Inserting data into sectors table
INSERT INTO sectors (sector) VALUES 
('הייטק'),
('פיננסים'),
('חינוך'),
('בריאות'),
('תעשייה');

-- Inserting data into users table
INSERT INTO users (username, email, name, ageID, genderID, areaID, sectorID, role, educationID, incomeID) VALUES 
('user1', 'user1@example.com', 'משתמש אחד', 1, 1, 1, 1, 'user', 1, 1),
('user2', 'user2@example.com', 'משתמש שני', 2, 2, 2, 2, 'user', 2, 2),
('user3', 'user3@example.com', 'משתמש שלישי', 3, 1, 3, 3, 'user', 3, 3),
('admin', 'admin@example.com', 'אדמין', 4, 2, 4, 4, 'admin', 4, 4),
('user4', 'user4@example.com', 'משתמש רביעי', 5, 1, 5, 5, 'user', 5, 5);

-- Inserting data into passwords table
INSERT INTO passwords (user_id, user_password) VALUES 
(1, 'password1'), 
(2, 'password2'), 
(3, 'password3'), 
(4, 'adminpassword'), 
(5, 'password4');

-- הכנסת נתונים לטבלת הסקרים
INSERT INTO surveys (surveyTitle, managerCode, report, imageUrl, confirmed)
VALUES 
('סקר לקוחות', 1, 'דו"ח על שביעות רצון הלקוחות', 'image1.jpg', FALSE),
('סקר עובדים', 2, 'דו"ח על שביעות רצון העובדים', 'image2.jpg',  FALSE),
('סקר מוצרים', 3, 'דו"ח על שביעות רצון מהמוצרים', 'image3.jpg',  FALSE),
('סקר שירות', 4, 'דו"ח על שביעות רצון מהשירות', 'image4.jpg', FALSE),
('סקר תהליך רכישה', 1, 'דו"ח על תהליך הרכישה', 'image5.jpg',  FALSE),
('סקר חווית משתמש', 2, 'דו"ח על חווית המשתמש', 'image6.jpg',  FALSE),
('סקר שיווק', 3, 'דו"ח על פעילויות השיווק', 'image7.jpg', FALSE),
('סקר חדשנות', 4, 'דו"ח על חדשנות', 'image8.jpg',  FALSE),
('סקר חינוך', 5, 'דו"ח על חינוך', 'image9.jpg',  FALSE),
('סקר בריאות', 1, 'דו"ח על בריאות', 'image10.jpg', FALSE),
('סקר כלכלה', 2, 'דו"ח על כלכלה', 'image11.jpg',  FALSE),
('סקר סביבה', 3, 'דו"ח על סביבה', 'image12.jpg',  FALSE),
('סקר תחבורה', 4, 'דו"ח על תחבורה', 'image13.jpg', FALSE),
('סקר תרבות', 1, 'דו"ח על תרבות', 'image14.jpg', FALSE),
('סקר ספורט', 2, 'דו"ח על ספורט', 'image15.jpg',  FALSE);

-- Insert statements for the surveysquestions table
INSERT INTO surveysquestions (question, surveyCode, questionType)
VALUES 
('איך היית מדרג את השירות שלנו?', 1, 'close'),
('מה דעתך על האיכות של המוצרים?', 1, 'open'),
('האם אתה מרוצה מהמקום עבודה?', 2, 'close'),
('מה דעתך על התנאים במקום העבודה?', 2, 'open'),
('איך היית מדרג את השירות שלנו?', 3, 'close'),
('מה דעתך על האיכות של המוצרים?', 3, 'open'),
('האם אתה מרוצה מהמקום עבודה?', 4, 'close'),
('מה דעתך על התנאים במקום העבודה?', 4, 'open'),
('איך היית מדרג את השירות שלנו?', 5, 'close'),
('מה דעתך על האיכות של המוצרים?', 5, 'open'),
('האם אתה מרוצה מהמקום עבודה?', 6, 'close'),
('מה דעתך על התנאים במקום העבודה?', 6, 'open'),
('איך היית מדרג את השירות שלנו?', 7, 'close'),
('מה דעתך על האיכות של המוצרים?', 7, 'open'),
('האם אתה מרוצה מהמקום עבודה?', 8, 'close'),
('מה דעתך על התנאים במקום העבודה?', 8, 'open'),
('איך היית מדרג את השירות שלנו?', 9, 'close'),
('מה דעתך על האיכות של המוצרים?', 9, 'open'),
('האם אתה מרוצה מהמקום עבודה?', 10, 'close'),
('מה דעתך על התנאים במקום העבודה?', 10, 'open');

-- Insert statements for the surveyCloseAnswers table
INSERT INTO surveyCloseAnswers (questionCode, answer)
VALUES 
(1, 'מאוד מרוצה'),
(1, 'מרוצה'),
(1, 'לא מרוצה'),
(3, 'מאוד מרוצה'),
(3, 'מרוצה'),
(3, 'לא מרוצה'),
(5, 'מאוד מרוצה'),
(5, 'מרוצה'),
(5, 'לא מרוצה'),
(7, 'מאוד מרוצה'),
(7, 'מרוצה'),
(7, 'לא מרוצה'),
(9, 'מאוד מרוצה'),
(9, 'מרוצה'),
(9, 'לא מרוצה'),
(11, 'מאוד מרוצה'),
(11, 'מרוצה'),
(11, 'לא מרוצה');

-- Insert statements for the surveyOpenAnswers table
INSERT INTO surveyOpenAnswers (questionCode, answer, userCode)
VALUES 
(2, 'השירות היה טוב מאוד', 1),
(4, 'המוצרים איכותיים מאוד', 2),
(6, 'השירות היה טוב מאוד', 3),
(8, 'המוצרים איכותיים מאוד', 4),
(10, 'השירות היה טוב מאוד', 5),
(12, 'המוצרים איכותיים מאוד', 1),
(14, 'השירות היה טוב מאוד', 2),
(16, 'המוצרים איכותיים מאוד', 3),
(18, 'השירות היה טוב מאוד', 4),
(20, 'המוצרים איכותיים מאוד', 5);

-- Insert statements for the surveyCloseData table
INSERT INTO surveyCloseData (userCode, answerCode)
VALUES 
(1, 1),
(1, 4),
(1, 7),
(1, 10),
(1, 13),
(1, 16),
(2, 2),
(2, 5),
(2, 8),
(2, 11),
(2, 14),
(2, 17),
(3, 3),
(3, 6),
(3, 9),
(3, 12),
(3, 15),
(3, 18);



