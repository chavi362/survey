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
(1, 'password1'), 
(2, 'password2'), 
(3, 'password3'), 
(4, 'password4'), 
(5, 'password5'), 
(6, 'password6'), 
(7, 'password7'), 
(8, 'password8'), 
(9, 'password9'), 
(10, 'password10'),
(11, 'managerpassword');

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
('How would you rate our customer service?', 16, 'close', 'image1.png'),
('What do you think about the quality of our products?', 16, 'open', 'image2.png'),
('Are you satisfied with your job?', 17, 'close', 'image3.png'),
('What improvements would you suggest for the workplace?', 17, 'open', 'image4.png'),
('How would you rate the value for money of our products?', 18, 'close', 'image5.png'),
('What features do you like most about our products?', 18, 'open', 'image6.png'),
('How satisfied are you with the service provided?', 19, 'close', 'image7.png'),
('What suggestions do you have for improving our service?', 19, 'open', 'image8.png'),
('How was your overall purchasing experience?', 20, 'close', 'image9.png'),
('What could we do to enhance your buying experience?',20, 'open', 'image10.png'),
('How would you rate the user interface of our product?', 21, 'close', 'image11.png'),
('What improvements would you like to see in the user interface?', 21, 'open', 'image12.png'),
('How do you rate the current education system?', 22, 'close', 'image13.png'),
('What changes would you suggest for the education system?', 22, 'open', 'image14.png'),
('How would you rate our customer service?', 23, 'close', 'image15.png'),
('What do you think about the quality of our products?', 23, 'open', 'image16.png'),
('Are you satisfied with your job?', 24, 'close', 'image17.png'),
('What improvements would you suggest for the workplace?', 24, 'open', 'image18.png'),
('How would you rate the value for money of our products?', 25, 'close', 'image19.png'),
('What features do you like most about our products?', 25, 'open', 'image20.png'),
('How satisfied are you with the service provided?', 26, 'close', 'image21.png'),
('What suggestions do you have for improving our service?', 26, 'open', 'image22.png'),
('How was your overall purchasing experience?', 27, 'close', 'image23.png'),
('What could we do to enhance your buying experience?', 27, 'open', 'image24.png'),
('How would you rate the user interface of our product?', 28, 'close', 'image25.png'),
('What improvements would you like to see in the user interface?', 28, 'open', 'image26.png');


-- Inserting data into surveyCloseAnswers table
INSERT INTO surveyCloseAnswers (questionCode, answer) VALUES 
(185, 'Very Satisfied'), (185, 'Satisfied'), (185, 'Neutral'), (185, 'Dissatisfied'), (185, 'Very Dissatisfied'),
(187, 'Very Satisfied'), (187, 'Satisfied'), (187, 'Neutral'), (187, 'Dissatisfied'), (187, 'Very Dissatisfied'),
(189, 'Excellent'), (189, 'Good'), (189, 'Average'), (189, 'Below Average'), (189, 'Poor'),
(191, 'Very Satisfied'), (191, 'Satisfied'), (191, 'Neutral'), (191, 'Dissatisfied'), (191, 'Very Dissatisfied'),
(193, 'Very Good'), (193, 'Good'), (193, 'Fair'), (193, 'Poor'), (193, 'Very Poor'),
(195, 'Very Satisfied'), (195, 'Satisfied'), (195, 'Neutral'), (195, 'Dissatisfied'), (195, 'Very Dissatisfied'),
(197, 'Excellent'), (197, 'Good'), (197, 'Average'), (197, 'Below Average'), (197, 'Poor'),
(199, 'Very Satisfied'), (199, 'Satisfied'), (199, 'Neutral'), (199, 'Dissatisfied'), (199, 'Very Dissatisfied'),
(201, 'Very Satisfied'), (201, 'Satisfied'), (201, 'Neutral'), (201, 'Dissatisfied'), (201, 'Very Dissatisfied'),
(203, 'Excellent'), (203, 'Good'), (203, 'Average'), (203, 'Below Average'), (203, 'Poor'),
(205, 'Very Satisfied'), (205, 'Satisfied'), (205, 'Neutral'), (205, 'Dissatisfied'), (205, 'Very Dissatisfied'),
(207, 'Very Good'), (207, 'Good'), (207, 'Fair'), (207, 'Poor'), (207, 'Very Poor'),
(209, 'Very Satisfied'), (209, 'Satisfied'), (209, 'Neutral'), (209, 'Dissatisfied'), (209, 'Very Dissatisfied');

-- Inserting data into surveyOpenAnswers table
INSERT INTO surveyOpenAnswers (questionCode, answer, userCode) VALUES 
(186, 'The quality of your products is outstanding.', 1),
(186, 'I love the durability of the products.', 2),
(186, 'Great value for money.', 3),
(186, 'The products are okay, but can be improved.', 4),
(186, 'Not satisfied with the product quality.', 5),
(188, 'More flexible working hours.', 1),
(188, 'Better communication from management.', 2),
(188, 'More opportunities for career advancement.', 3),
(188, 'Better office facilities.', 4),
(188, 'Increase in salary.', 5),
(190, 'I love the sleek design.', 1),
(190, 'The user interface is very intuitive.', 2),
(190, 'Great usability.', 3),
(190, 'Responsive and fast.', 4),
(190, 'More customization options.', 5),
(192, 'Faster response times.', 1),
(192, 'More friendly staff.', 2),
(192, 'Better training for staff.', 3),
(192, 'Extended service hours.', 4),
(192, 'Better pricing.', 5),
(194, 'More variety of payment options.', 1),
(194, 'Better customer support.', 2),
(194, 'Quicker delivery times.', 3),
(194, 'More product information.', 4),
(194, 'Easier return process.', 5),
(196, 'More intuitive navigation.', 1),
(196, 'Better color schemes.', 2),
(196, 'Improved loading speeds.', 3),
(196, 'More features.', 4),
(196, 'Easier accessibility options.', 5),
(198, 'More practical applications.', 1),
(198, 'Better teacher training.', 2),
(198, 'Updated curriculum.', 3),
(198, 'More extracurricular activities.', 4),
(198, 'Better facilities.', 5),
(200, 'Excellent service.', 1),
(200, 'Good service.', 2),
(200, 'Average service.', 3),
(200, 'Poor service.', 4),
(200, 'Very poor service.', 5),
(202, 'Very intuitive interface.', 1),
(202, 'Easy to navigate.', 2),
(202, 'User friendly.', 3),
(202, 'Could use some improvements.', 4),
(202, 'Difficult to use.', 5),
(204, 'Great value for money.', 1),
(204, 'Reasonable price.', 2),
(204, 'Too expensive.', 3),
(204, 'Affordable.', 4),
(204, 'Not worth the price.', 5),
(206, 'Flexible working hours.', 1),
(206, 'Good communication.', 2),
(206, 'Career growth opportunities.', 3),
(206, 'Good office facilities.', 4),
(206, 'Competitive salary.', 5),
(208, 'Sleek design.', 1),
(208, 'Intuitive interface.', 2),
(208, 'Highly usable.', 3),
(208, 'Responsive.', 4),
(208, 'Customizable.', 5);

-- Inserting data into surveyCloseData table
INSERT INTO surveyCloseData (userCode, answerCode) VALUES 
(1, 141), (1, 142), (1, 143), (1, 144), (1, 145), (1, 146), (1, 147),
(2, 148), (2, 149), (2, 150), (2, 151), (2, 152), (2, 153), (2, 154),
(3, 155), (3, 156), (3, 157), (3, 158), (3, 159), (3, 160), (3, 161),
(4, 162), (4, 163), (4, 164), (4, 165), (4, 166), (4, 167), (4, 168),
(5, 169), (5, 170), (5, 171), (5, 172), (5, 173), (5, 174), (5, 175),
(6, 176), (6, 177), (6, 178), (6, 179), (6, 180), (6, 181), (6, 182),
(7, 183), (7, 184), (7, 185), (7, 186), (7, 187), (7, 188), (7, 189),
(8, 190), (8, 191), (8, 192), (8, 193), (8, 194), (8, 195), (8, 196),
(9, 197), (9, 198), (9, 199), (9, 200), (9, 201), (9, 202), (9, 203),
(10, 204), (10, 205);


