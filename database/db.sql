-- Creating tables
CREATE DATABASE IF NOT EXISTS SurveyManagement;
USE SurveyManagement;

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
    confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (managerCode) REFERENCES users(userCode)
);

CREATE TABLE surveysquestions (
    questionCode INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    surveyCode INT NOT NULL,
    questionType ENUM('open', 'close') NOT NULL,
    image_url VARCHAR(500) NOT NULL,
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
('New York'),
('Los Angeles'),
('Chicago'),
('Houston'),
('Phoenix');

-- Inserting data into family_income_levels table
INSERT INTO family_income_levels (startRange, endRange) VALUES 
(30000, 50000), 
(50001, 70000), 
(70001, 90000), 
(90001, 110000), 
(110001, 130000);

-- Inserting data into genders table
INSERT INTO genders (gender) VALUES 
('Male'),
('Female');

-- Inserting data into education_levels table
INSERT INTO education_levels (education_level) VALUES 
('High School'),
('Associate Degree'),
('Bachelor\'s Degree'),
('Master\'s Degree'),
('Doctorate');

-- Inserting data into sectors table
INSERT INTO sectors (sector) VALUES 
('Technology'),
('Finance'),
('Healthcare'),
('Education'),
('Manufacturing');

-- Inserting data into users table
INSERT INTO users (username, email, name, ageID, genderID, areaID, sectorID, role, educationID, incomeID) VALUES 
('user1', 'user1@example.com', 'User One', 1, 1, 1, 1, 'user', 1, 1),
('user2', 'user2@example.com', 'User Two', 2, 2, 2, 2, 'user', 2, 2),
('user3', 'user3@example.com', 'User Three', 3, 1, 3, 3, 'user', 3, 3),
('user4', 'user4@example.com', 'User Four', 4, 2, 4, 4, 'user', 4, 4),
('user5', 'user5@example.com', 'User Five', 5, 1, 5, 5, 'user', 5, 5),
('user6', 'user6@example.com', 'User Six', 1, 2, 1, 1, 'user', 1, 1),
('user7', 'user7@example.com', 'User Seven', 2, 1, 2, 2, 'user', 2, 2),
('user8', 'user8@example.com', 'User Eight', 3, 2, 3, 3, 'user', 3, 3),
('user9', 'user9@example.com', 'User Nine', 4, 1, 4, 4, 'user', 4, 4),
('user10', 'user10@example.com', 'User Ten', 5, 2, 5, 5, 'user', 5, 5),
('manager', 'manager@example.com', 'Survey Manager', 3, 1, 3, 3, 'admin', 3, 3);

-- Inserting data into passwords table
INSERT INTO passwords (user_id, user_password) VALUES 
(1, '$2b$10$XS5Gs8NTTMLanP.D7KjGa.MFjIKcclnrWSUnoYG.zWs8qGoqm5mFa'), 
(2, '$2b$10$XS5Gs8NTTMLanP.D7KjGa.MFjIKcclnrWSUnoYG.zWs8qGoqm5mFa'), 
(3, '$2b$10$XS5Gs8NTTMLanP.D7KjGa.MFjIKcclnrWSUnoYG.zWs8qGoqm5mFa'), 
(4, '$2b$10$XS5Gs8NTTMLanP.D7KjGa.MFjIKcclnrWSUnoYG.zWs8qGoqm5mFa'), 
(5, '$2b$10$XS5Gs8NTTMLanP.D7KjGa.MFjIKcclnrWSUnoYG.zWs8qGoqm5mFa'), 
(6, '$2b$10$XS5Gs8NTTMLanP.D7KjGa.MFjIKcclnrWSUnoYG.zWs8qGoqm5mFa'), 
(7, '$2b$10$XS5Gs8NTTMLanP.D7KjGa.MFjIKcclnrWSUnoYG.zWs8qGoqm5mFa'), 
(8, '$2b$10$XS5Gs8NTTMLanP.D7KjGa.MFjIKcclnrWSUnoYG.zWs8qGoqm5mFa'), 
(9, '$2b$10$XS5Gs8NTTMLanP.D7KjGa.MFjIKcclnrWSUnoYG.zWs8qGoqm5mFa'), 
(10, '$2b$10$XS5Gs8NTTMLanP.D7KjGa.MFjIKcclnrWSUnoYG.zWs8qGoqm5mFa'),
(11, '$2b$10$XS5Gs8NTTMLanP.D7KjGa.MFjIKcclnrWSUnoYG.zWs8qGoqm5mFa');

-- Inserting data into surveys table
INSERT INTO surveys (surveyTitle, managerCode, confirmed) VALUES 
('Customer Satisfaction Survey', 7, TRUE),
('Employee Feedback Survey', 7, TRUE),
('Product Evaluation Survey', 7, TRUE),
('Service Quality Survey', 7, TRUE),
('Purchasing Experience Survey', 7, TRUE),
('User Experience Survey', 7, TRUE),
('Educational Survey', 7, TRUE),
('Confirmed Customer Satisfaction Survey', 1, TRUE),
('Unconfirmed Customer Satisfaction Survey', 1, FALSE),
('Confirmed Employee Feedback Survey', 2, TRUE),
('Unconfirmed Employee Feedback Survey', 2, FALSE),
('Confirmed Product Evaluation Survey', 3, TRUE),
('Unconfirmed Product Evaluation Survey', 3, FALSE),
('Confirmed Service Quality Survey', 2, TRUE),
('Unconfirmed Service Quality Survey', 2, FALSE);

-- Inserting data into surveysquestions table
INSERT INTO surveysquestions (question, surveyCode, questionType, image_url) VALUES 
('How would you rate our customer service?', 1, 'close', 'image1.png'),
('What do you think about the quality of our products?', 1, 'open', 'image2.png'),
('Are you satisfied with your job?', 2, 'close', 'image3.png'),
('What improvements would you suggest for the workplace?', 2, 'open', 'image4.png'),
('How would you rate the value for money of our products?', 3, 'close', 'image5.png'),
('What features do you like most about our products?', 3, 'open', 'image6.png'),
('How satisfied are you with the service provided?', 4, 'close', 'image7.png'),
('What suggestions do you have for improving our service?', 4, 'open', 'image8.png'),
('How was your overall purchasing experience?', 5, 'close', 'image9.png'),
('What could we do to enhance your buying experience?',5, 'open', 'image10.png'),
('How would you rate the user interface of our product?', 6, 'close', 'image11.png'),
('What improvements would you like to see in the user interface?', 6, 'open', 'image12.png'),
('How do you rate the current education system?', 7, 'close', 'image13.png'),
('What changes would you suggest for the education system?', 7, 'open', 'image14.png'),
('How would you rate our customer service?', 8, 'close', 'image15.png'),
('What do you think about the quality of our products?', 8, 'open', 'image16.png'),
('Are you satisfied with your job?', 9, 'close', 'image17.png'),
('What improvements would you suggest for the workplace?', 9, 'open', 'image18.png'),
('How would you rate the value for money of our products?', 10, 'close', 'image19.png'),
('What features do you like most about our products?', 10, 'open', 'image20.png'),
('How satisfied are you with the service provided?', 11, 'close', 'image21.png'),
('What suggestions do you have for improving our service?', 11, 'open', 'image22.png'),
('How was your overall purchasing experience?', 12, 'close', 'image23.png'),
('What could we do to enhance your buying experience?', 12, 'open', 'image24.png'),
('How would you rate the user interface of our product?', 13, 'close', 'image25.png'),
('What improvements would you like to see in the user interface?', 14, 'open', 'image26.png');


-- Inserting data into surveyCloseAnswers table
INSERT INTO surveyCloseAnswers (questionCode, answer) VALUES 
(27, 'Very Satisfied'), (27, 'Satisfied'), (27, 'Neutral'), (27, 'Dissatisfied'), (27, 'Very Dissatisfied'),
(29, 'Very Satisfied'), (29, 'Satisfied'), (29, 'Neutral'), (29, 'Dissatisfied'), (29, 'Very Dissatisfied'),
(31, 'Excellent'), (31, 'Good'), (31, 'Average'), (31, 'Below Average'), (31, 'Poor'),
(33, 'Very Satisfied'), (33, 'Satisfied'), (33, 'Neutral'), (33, 'Dissatisfied'), (33, 'Very Dissatisfied'),
(35, 'Very Good'), (35, 'Good'), (35, 'Fair'), (35, 'Poor'), (35, 'Very Poor'),
(37, 'Very Satisfied'), (37, 'Satisfied'), (37, 'Neutral'), (37, 'Dissatisfied'), (37, 'Very Dissatisfied'),
(39, 'Excellent'), (39, 'Good'), (39, 'Average'), (39, 'Below Average'), (39, 'Poor'),
(41, 'Very Satisfied'), (41, 'Satisfied'), (41, 'Neutral'), (41, 'Dissatisfied'), (41, 'Very Dissatisfied'),
(43, 'Very Satisfied'), (43, 'Satisfied'), (43, 'Neutral'), (43, 'Dissatisfied'), (43, 'Very Dissatisfied'),
(45, 'Excellent'), (45, 'Good'), (45, 'Average'), (45, 'Below Average'), (45, 'Poor'),
(47, 'Very Satisfied'), (47, 'Satisfied'), (47, 'Neutral'), (47, 'Dissatisfied'), (47, 'Very Dissatisfied'),
(49, 'Very Good'), (49, 'Good'), (49, 'Fair'), (49, 'Poor'), (49, 'Very Poor'),
(51, 'Very Satisfied'), (51, 'Satisfied'), (51, 'Neutral'), (51, 'Dissatisfied'), (51, 'Very Dissatisfied');

-- Inserting data into surveyOpenAnswers table
INSERT INTO surveyOpenAnswers (questionCode, answer, userCode) VALUES 
(28, 'The quality of your products is outstanding.', 1),
(28, 'I love the durability of the products.', 2),
(28, 'Great value for money.', 3),
(28, 'The products are okay, but can be improved.', 4),
(28, 'Not satisfied with the product quality.', 5),
(30, 'More flexible working hours.', 1),
(30, 'Better communication from management.', 2),
(30, 'More opportunities for career advancement.', 3),
(30, 'Better office facilities.', 4),
(30, 'Increase in salary.', 5),
(32, 'I love the sleek design.', 1),
(32, 'The user interface is very intuitive.', 2),
(32, 'Great usability.', 3),
(32, 'Responsive and fast.', 4),
(32, 'More customization options.', 5),
(34, 'Faster response times.', 1),
(34, 'More friendly staff.', 2),
(34, 'Better training for staff.', 3),
(34, 'Extended service hours.', 4),
(34, 'Better pricing.', 5),
(36, 'More variety of payment options.', 1),
(36, 'Better customer support.', 2),
(36, 'Quicker delivery times.', 3),
(36, 'More product information.', 4),
(36, 'Easier return process.', 5),
(38, 'More intuitive navigation.', 1),
(38, 'Better color schemes.', 2),
(38, 'Improved loading speeds.', 3),
(38, 'More features.', 4),
(38, 'Easier accessibility options.', 5),
(40, 'More practical applications.', 1),
(40, 'Better teacher training.', 2),
(40, 'Updated curriculum.', 3),
(40, 'Better facilities.', 5),
(42, 'Excellent service.', 1),
(42, 'Good service.', 2),
(42, 'Average service.', 3),
(42, 'Poor service.', 4),
(42, 'Very poor service.', 5),
(44, 'Very intuitive interface.', 1),
(44, 'Easy to navigate.', 2),
(44, 'User friendly.', 3),
(44, 'Could use some improvements.', 4),
(44, 'Difficult to use.', 5),
(46, 'Great value for money.', 1),
(46, 'Reasonable price.', 2),
(46, 'Too expensive.', 3),
(46, 'Affordable.', 4),
(46, 'Not worth the price.', 5),
(48, 'Flexible working hours.', 1),
(48, 'Good communication.', 2),
(48, 'Career growth opportunities.', 3),
(48, 'Good office facilities.', 4),
(48, 'Competitive salary.', 5),
(50, 'Sleek design.', 1),
(50, 'Intuitive interface.', 2),
(50, 'Highly usable.', 3),
(50, 'Responsive.', 4),
(50, 'Customizable.', 5);

INSERT INTO surveyCloseData (userCode, answerCode) VALUES 
(1, 66), (1, 67), (1, 68), (1, 69), (1, 70), (1, 71), (1, 72),
(2, 73), (2, 74), (2, 75), (2, 76), (2, 77), (2, 78), (2, 79),
(3, 80), (3, 81), (3, 82), (3, 83), (3, 84), (3, 85), (3, 86),
(4, 87), (4, 88), (4, 89), (4, 90), (4, 91), (4, 92), (4, 93),
(5, 94), (5, 95), (5, 96), (5, 97), (5, 98), (5, 99), (5, 100),
(6, 101), (6, 102), (6, 103), (6, 104), (6, 105), (6, 106), (6, 107),
(7, 108), (7, 109), (7, 110), (7, 111), (7, 112), (7, 113), (7, 114),
(8, 115), (8, 116), (8, 117), (8, 118), (8, 119), (8, 120), (8, 121),
(9, 122), (9, 123), (9, 124), (9, 125), (9, 126), (9, 127), (9, 128),
(10, 129), (10, 130);



