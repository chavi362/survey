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
    confirmed BOOLEAN NOT NULL DEFAULT FALSE,
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

-- Inserting data into surveys table
INSERT INTO surveys (surveyTitle, managerCode, report, showResults, confirmed) VALUES 
('סקר שביעות רצון לקוחות', 1, 'דוח סקר שביעות רצון לקוחות', TRUE, FALSE),
('סקר שכר והטבות', 2, 'דוח סקר שכר והטבות', TRUE, TRUE),
('סקר שביעות רצון עובדים', 3, 'דוח סקר שביעות רצון עובדים', TRUE, FALSE),
('סקר שירות לקוחות', 4, 'דוח סקר שירות לקוחות', TRUE, TRUE),
('סקר חוויית משתמש', 5, 'דוח סקר חוויית משתמש', TRUE, FALSE),
('סקר תדמית החברה', 1, 'דוח סקר תדמית החברה', TRUE, TRUE),
('סקר חדשנות טכנולוגית', 2, 'דוח סקר חדשנות טכנולוגית', TRUE, FALSE),
('סקר שביעות רצון ממוצר', 3, 'דוח סקר שביעות רצון ממוצר', TRUE, TRUE),
('סקר איכות המוצר', 4, 'דוח סקר איכות המוצר', TRUE, FALSE),
('סקר נאמנות לקוחות', 5, 'דוח סקר נאמנות לקוחות', TRUE, TRUE),
('סקר שוק', 1, 'דוח סקר שוק', TRUE, FALSE),
('סקר מגמות צרכנים', 2, 'דוח סקר מגמות צרכנים', TRUE, TRUE),
('סקר תחושת ביטחון', 3, 'דוח סקר תחושת ביטחון', TRUE, FALSE),
('סקר שיפור שירותים', 4, 'דוח סקר שיפור שירותים', TRUE, TRUE),
('סקר יעילות ארגונית', 5, 'דוח סקר יעילות ארגונית', TRUE, FALSE);

-- Inserting data into surveysquestions table
INSERT INTO surveysquestions (question, surveyCode) VALUES 
('מה רמת שביעות הרצון שלך מהמוצר?', 1),
('מהי רמת השירות שקיבלת?', 2),
('איך היית מדרג את איכות המוצר?', 3),
('האם היית ממליץ עלינו לחברים?', 4),
('מה דעתך על ממשק המשתמש שלנו?', 5);

-- Inserting data into surveyCloseAnswers table
INSERT INTO surveyCloseAnswers (questionCode, answer) VALUES 
(1, 'מאוד מרוצה'),
(1, 'מרוצה'),
(1, 'לא מרוצה'),
(2, 'מצוין'),
(2, 'טוב'),
(2, 'סביר'),
(3, 'גבוהה מאוד'),
(3, 'גבוהה'),
(3, 'נמוכה'),
(4, 'כן'),
(4, 'לא'),
(5, 'נוח מאוד'),
(5, 'נוח'),
(5, 'לא נוח');

-- Inserting data into surveyOpenAnswers table
INSERT INTO surveyOpenAnswers (questionCode, answer, userCode) VALUES 
(1, 'המוצר מצוין ומשמש אותי רבות', 1),
(2, 'השירות היה מהיר ויעיל', 2),
(3, 'איכות המוצר גבוהה מאוד', 3),
(4, 'כן, בהחלט אמליץ', 4),
(5, 'ממשק המשתמש מאוד ידידותי', 5);

-- Inserting data into surveyCloseData table
INSERT INTO surveyCloseData (userCode, answerCode) VALUES 
(1, 1),
(2, 4),
(3, 7),
(4, 10),
(5, 13);


