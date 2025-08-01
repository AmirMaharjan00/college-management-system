-- Add courses
-- MARK: COURSES
INSERT INTO `courses` (`id`, `name`, `abbreviation`, `duration`, `semester`, `cost`, `registered_date`) VALUES 
(NULL, 'Bachelor in Business Studies', 'BBS', '4', '4', '100000', current_timestamp()), 
(NULL, 'Bachelor of Arts in Social Works', 'BASW', '4', '4', '200000', current_timestamp()), 
(NULL, 'Class 11', 'XI', '1', '1', '50000', current_timestamp()), 
(NULL, 'Class 12', 'XII', '1', '1', '80000', current_timestamp()),
(NULL, 'Bachelor in Computer Application', 'BCA', '4', '8', '360000', current_timestamp());

-- Add Subjects
-- MARK: SUBJECTS
INSERT INTO `subjects` (`id`, `name`, `course_id`, `semester`, `year`, `registered_date`) VALUES 
(NULL, 'Computer Fundamentals & Applications', '5', '1', '1', current_timestamp()),
(NULL, 'Society and Technology', '5', '1', '1', current_timestamp()),
(NULL, 'English I', '5', '1', '1', current_timestamp()),
(NULL, 'Mathematics I', '5', '1', '1', current_timestamp()),
(NULL, 'Digital Logic', '5', '1', '1', current_timestamp()),
(NULL, 'C Programming', '5', '2', '1', current_timestamp()),
(NULL, 'Financial Accounting', '5', '2', '1', current_timestamp()),
(NULL, 'English II', '5', '2', '1', current_timestamp()),
(NULL, 'Mathematics II', '5', '2', '1', current_timestamp()),
(NULL, 'Microprocessor and Computer Architecture', '5', '2', '1', current_timestamp());

-- Add Books
-- MARK: BOOKS
INSERT INTO `books` (`id`, `name`, `author`, `publication`, `publishedYear`, `language`) VALUES
(NULL, 'Computer Fundamentals & Applications', 'Amir Maharjan', 'Kirtipur Publication', '2025-07-01', 'English'),
(NULL, 'Introduction to Algorithms', 'Thomas H. Cormen', 'MIT Press', '2020-06-15', 'English'),
(NULL, 'Data Structures in C', 'Reema Thareja', 'Oxford University Press', '2019-01-10', 'English'),
(NULL, 'Operating System Concepts', 'Abraham Silberschatz', 'Wiley', '2021-09-01', 'English'),
(NULL, 'Database Management Systems', 'Raghu Ramakrishnan', 'McGraw-Hill', '2018-05-20', 'English'),
(NULL, 'Artificial Intelligence: A Modern Approach', 'Stuart Russell', 'Pearson', '2022-02-12', 'English'),
(NULL, 'Digital Logic and Computer Design', 'M. Morris Mano', 'Pearson', '2017-07-30', 'English'),
(NULL, 'Let Us C', 'Yashavant Kanetkar', 'BPB Publications', '2019-12-01', 'English'),
(NULL, 'Computer Networks', 'Andrew S. Tanenbaum', 'Prentice Hall', '2020-04-01', 'English'),
(NULL, 'Modern Operating Systems', 'Andrew S. Tanenbaum', 'Pearson', '2021-08-05', 'English'),
(NULL, 'Python Programming', 'John Zelle', 'Franklin Beedle & Associates', '2019-03-10', 'English'),
(NULL, 'Java: The Complete Reference', 'Herbert Schildt', 'McGraw-Hill', '2020-07-20', 'English'),
(NULL, 'C++ Primer', 'Stanley B. Lippman', 'Addison-Wesley', '2018-10-18', 'English'),
(NULL, 'Head First Java', 'Kathy Sierra', 'Reilly Media', '2017-05-14', 'English'),
(NULL, 'Clean Code', 'Robert C. Martin', 'Prentice Hall', '2020-01-01', 'English'),
(NULL, 'The Pragmatic Programmer', 'Andy Hunt', 'Addison-Wesley', '2019-11-25', 'English'),
(NULL, 'You Don’t Know JS', 'Kyle Simpson', 'Reilly Media', '2021-04-04', 'English'),
(NULL, 'Design Patterns', 'Erich Gamma', 'Addison-Wesley', '2018-06-01', 'English'),
(NULL, 'Introduction to Machine Learning', 'Ethem Alpaydin', 'MIT Press', '2022-10-10', 'English'),
(NULL, 'Computer Architecture', 'John L. Hennessy', 'Morgan Kaufmann', '2023-02-28', 'English');

-- Add Users
-- MARK: USERS
INSERT INTO `users` (`id`, `name`, `email`, `password`, `contact`, `address`, `gender`, `role`, `view`, `courseId`, `semester`, `status`, `profile`, `registered_date`) VALUES 
(NULL, 'Shahid Smarak College', 'shahidsmarak@gmail.com', 'Shahid@123', '9876543210', 'Nepal', 'male', 'admin', 'light', null, '0', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Amir Maharjan', 'mhrznamir.am@gmail.com', 'Amir@123', '9808362724', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Saroj Maharjan', 'sarojmhzn28@gmail.com', 'Saroj@123', '9876543210', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Shrijal Maharjan', 'shrijalmaharjan@gmail.com', 'Shrijal@123', '8765432109', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Swaraj Maharjan', 'swarajmaharjan@gmail.com', 'Swaraj@123', '8765432109', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Ajesh Maharjan', 'ajeshmaharjan@gmail.com', 'Ajesh@123', '8765432109', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Pracess Maharjan', 'pracessmaharjan@gmail.com', 'Pracess@123', '8765432109', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Om Kapali', 'pracessmaharjan@gmail.com', 'Omkapali@123', '8765432109', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Nishan Thapa', 'nishanthapa@gmail.com', 'Nishan@123', '8765432109', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Suren Bohora', 'surenbohora@gmail.com', 'Suren@123', '8765432109', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Nishant Man Singh', 'nishantmansingh@gmail.com', 'Nishant@123', '8765432109', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Biswas Oli', 'biswasoli@gmail.com', 'Biswas@123', '8765432109', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Ayush Manandhar', 'ayushmanandhar@gmail.com', 'Ayush@123', '8765432109', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Bisesh Adhikari', 'biseshadhikari@gmail.com', 'Bisesh@123', '9808362724', 'Nepal', 'male', 'student', 'light', 5, '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Bishal Sharma', 'bishal.sharma@college.edu', 'Bishal@123', '9812345678', 'Nepal', 'male', 'teacher', 'dark', null, '0', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Anita Thapa', 'anita.thapa@college.edu', 'Anita@123', '9801234567', 'Nepal', 'female', 'teacher', 'light', null, '0', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Ravi Gurung', 'ravi.gurung@college.edu', 'Ravi@123', '9823456781', 'Nepal', 'male', 'teacher', 'dark', null, '0', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Sujata Lama', 'sujata.lama@college.edu', 'Sujata@123', '9845671230', 'Nepal', 'female', 'teacher', 'light', null, '0', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Manish Shrestha', 'manish.staff@college.edu', 'Manish@123', '9865432109', 'Nepal', 'male', 'staff', 'light', null, '0', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Rachana KC', 'rachana.kc@college.edu', 'Rachana@123', '9854321987', 'Nepal', 'female', 'staff', 'dark', null, '0', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Kiran Adhikari', 'kiran.adhikari@college.edu', 'Kiran@123', '9832109876', 'Nepal', 'male', 'staff', 'light', null, '0', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Deepa Maharjan', 'deepa.maharjan@college.edu', 'Deepa@123', '9811112222', 'Nepal', 'female', 'staff', 'dark', null, '0', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Rajesh Khadka', 'rajesh.khadka@college.edu', 'Rajesh@123', '9840033211', 'Nepal', 'male', 'teacher', 'light', null, '0', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Sabina Tamang', 'sabina.tamang@college.edu', 'Sabina@123', '9860001122', 'Nepal', 'female', 'staff', 'dark', null, '0', 'offline', '/images/user.jpg', current_timestamp());

-- Add Books Issued
-- MARK: BOOKS ISSUED
INSERT INTO `booksissued` (`id`, `bookId`, `userId`, `issuedDate`, `dueDate`, `returnDate`, `status`, `fineAmount`, `issuedBy`, `fineStatus`) VALUES
(NULL, '1', '3', CURRENT_TIMESTAMP(), '2025-07-09 00:00:00', NULL, 'returned', '0', '1', 'N/A'),
(NULL, '2', '4', CURRENT_TIMESTAMP(), '2025-07-10 00:00:00', NULL, 'overdue', '50', '2', 'unpaid'),
(NULL, '3', '5', CURRENT_TIMESTAMP(), '2025-07-11 00:00:00', NULL, 'issued', '0', '3', 'N/A'),
(NULL, '4', '6', CURRENT_TIMESTAMP(), '2025-07-12 00:00:00', NULL, 'issued', '0', '1', 'N/A'),
(NULL, '5', '7', CURRENT_TIMESTAMP(), '2025-07-13 00:00:00', NULL, 'issued', '0', '2', 'N/A'),
(NULL, '6', '8', CURRENT_TIMESTAMP(), '2025-07-14 00:00:00', NULL, 'returned', '0', '3', 'N/A'),
(NULL, '7', '9', CURRENT_TIMESTAMP(), '2025-07-15 00:00:00', NULL, 'issued', '0', '1', 'N/A'),
(NULL, '8', '10', CURRENT_TIMESTAMP(), '2025-07-16 00:00:00', NULL, 'issued', '0', '2', 'N/A'),
(NULL, '9', '11', CURRENT_TIMESTAMP(), '2025-07-17 00:00:00', NULL, 'overdue', '50', '3', 'unpaid'),
(NULL, '10', '12', CURRENT_TIMESTAMP(), '2025-07-18 00:00:00', NULL, 'issued', '0', '1', 'N/A'),
(NULL, '11', '13', CURRENT_TIMESTAMP(), '2025-07-19 00:00:00', NULL, 'issued', '0', '2', 'N/A'),
(NULL, '12', '14', CURRENT_TIMESTAMP(), '2025-07-20 00:00:00', NULL, 'returned', '0', '3', 'N/A'),
(NULL, '13', '5', CURRENT_TIMESTAMP(), '2025-07-21 00:00:00', NULL, 'returned', '0', '1', 'N/A'),
(NULL, '14', '6', CURRENT_TIMESTAMP(), '2025-07-22 00:00:00', NULL, 'returned', '0', '2', 'N/A'),
(NULL, '15', '7', CURRENT_TIMESTAMP(), '2025-07-23 00:00:00', NULL, 'issued', '0', '3', 'N/A'),
(NULL, '16', '8', CURRENT_TIMESTAMP(), '2025-07-24 00:00:00', NULL, 'issued', '0', '1', 'N/A'),
(NULL, '17', '9', CURRENT_TIMESTAMP(), '2025-07-25 00:00:00', NULL, 'overdue', '50', '2', 'unpaid'),
(NULL, '18', '2', CURRENT_TIMESTAMP(), '2025-07-26 00:00:00', NULL, 'overdue', '50', '3', 'unpaid'),
(NULL, '19', '1', CURRENT_TIMESTAMP(), '2025-07-27 00:00:00', NULL, 'overdue', '50', '1', 'unpaid'),
(NULL, '20', '2', CURRENT_TIMESTAMP(), '2025-07-28 00:00:00', NULL, 'issued', '0', '2', 'N/A');
