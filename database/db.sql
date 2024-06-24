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
    questionType ENUM('open', 'close') NOT NULL,
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



-- הכנסת נתונים לטבלת הסקרים
INSERT INTO surveys (surveyTitle, managerCode, report, showResults, confirmed)
VALUES 
('סקר 1', 1, 'דוח סקר 1', TRUE, FALSE),
('סקר 2', 2, 'דוח סקר 2', TRUE, FALSE),
('סקר 3', 1, 'דוח סקר 3', TRUE, FALSE),
('סקר 4', 3, 'דוח סקר 4', TRUE, FALSE),
('סקר 5', 2, 'דוח סקר 5', TRUE, FALSE),
('סקר 6', 1, 'דוח סקר 6', TRUE, FALSE),
('סקר 7', 3, 'דוח סקר 7', TRUE, FALSE),
('סקר 8', 1, 'דוח סקר 8', TRUE, FALSE),
('סקר 9', 2, 'דוח סקר 9', TRUE, FALSE),
('סקר 10', 3, 'דוח סקר 10', TRUE, FALSE),
('סקר 11', 1, 'דוח סקר 11', TRUE, FALSE),
('סקר 12', 2, 'דוח סקר 12', TRUE, FALSE),
('סקר 13', 3, 'דוח סקר 13', TRUE, FALSE),
('סקר 14', 1, 'דוח סקר 14', TRUE, FALSE),
('סקר 15', 2, 'דוח סקר 15', TRUE, FALSE);

-- הכנסת נתונים לטבלת השאלות
INSERT INTO surveysquestions (question, surveyCode, questionType)
VALUES 
('מה דעתך על השירות?', 1, 'open'),
('איזה יום היום?', 1, 'close'),
('מהו גודל המשפחה שלך?', 2, 'open'),
('מה הצבע האהוב עליך?', 2, 'close'),
('מהו סוג הבית שלך?', 3, 'open'),
('איזה חיה אתה הכי אוהב?', 3, 'close'),
('מהו שם הרחוב שלך?', 4, 'open'),
('מהי השפה הראשונה שלך?', 4, 'close'),
('מהו התחביב האהוב עליך?', 5, 'open'),
('מהי המדינה בה נולדת?', 5, 'close'),
('כמה זמן לוקח לך להגיע לעבודה?', 6, 'open'),
('מהו סוג הרכב שלך?', 6, 'close'),
('מהו סוג המוזיקה המועדף עליך?', 7, 'open'),
('מהו סוג הספרים האהוב עליך?', 7, 'close'),
('מהו שם הכלב שלך?', 8, 'open');

-- הכנסת נתונים לטבלת התשובות לשאלות סגורות
INSERT INTO surveyCloseAnswers (questionCode, answer)
VALUES 
(2, 'שני'),
(2, 'שלישי'),
(2, 'חמישי'),
(4, 'אדום'),
(4, 'כחול'),
(4, 'ירוק'),
(6, 'חתול'),
(6, 'כלב'),
(6, 'דג'),
(8, 'עברית'),
(8, 'אנגלית'),
(8, 'ערבית'),
(10, 'ישראל'),
(10, 'ארה"ב'),
(10, 'צרפת'),
(12, 'רכב פרטי'),
(12, 'אופנוע'),
(12, 'אופניים'),
(14, 'רומן'),
(14, 'מדע בדיוני'),
(14, 'עיון');

-- הכנסת נתונים לטבלת התשובות לשאלות פתוחות
INSERT INTO surveyOpenAnswers (questionCode, answer, userCode)
VALUES 
(1, 'שירות טוב מאוד', 1),
(3, '5 נפשות', 2),
(5, 'דירה', 1),
(7, 'רחוב הרצל', 3),
(9, 'נגינה בגיטרה', 2),
(11, '20 דקות', 3),
(13, 'פופ', 1),
(15, 'רקסי', 2);

-- הכנסת נתונים לטבלת הנתונים לתשובות סגורות
INSERT INTO surveyCloseData (userCode, answerCode)
VALUES 
(1, 1),
(1, 4),
(2, 7),
(2, 10),
(3, 13),
(3, 16),
(1, 19);




