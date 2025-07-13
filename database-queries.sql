-- / Add Users
INSERT INTO `users` (`id`, `name`, `email`, `password`, `contact`, `address`, `gender`, `role`, `view`, `courseId`, `semester`, `status`, `profile`, `registered_date`) VALUES 
(NULL, 'Shahid Smarak College', 'shahidsmarak@gmail.com', 'Shahid@123', '9876543210', 'Nepal', 'male', 'admin', 'light', '0', '0', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Amir Maharjan', 'mhrznamir.am@gmail.com', 'Amir@123', '9808362724', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Saroj Maharjan', 'sarojmhzn28@gmail.com', 'Saroj@123', '9876543210', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Shrijal Maharjan', 'shrijalmaharjan@gmail.com', 'Shrijal@123', '8765432109', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Swaraj Maharjan', 'swarajmaharjan@gmail.com', 'Swaraj@123', '8765432109', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Ajesh Maharjan', 'ajeshmaharjan@gmail.com', 'Ajesh@123', '8765432109', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Pracess Maharjan', 'pracessmaharjan@gmail.com', 'Pracess@123', '8765432109', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Om Kapali', 'pracessmaharjan@gmail.com', 'Omkapali@123', '8765432109', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Nishan Thapa', 'nishanthapa@gmail.com', 'Nishan@123', '8765432109', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Suren Bohora', 'surenbohora@gmail.com', 'Suren@123', '8765432109', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Nishant Man Singh', 'nishantmansingh@gmail.com', 'Nishant@123', '8765432109', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Biswas Oli', 'biswasoli@gmail.com', 'Biswas@123', '8765432109', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Ayush Manandhar', 'ayushmanandhar@gmail.com', 'Ayush@123', '8765432109', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp()),
(NULL, 'Bisesh Adhikari', 'biseshadhikari@gmail.com', 'Bisesh@123', '9808362724', 'Nepal', 'male', 'student', 'light', '5', '8', 'offline', '/images/user.jpg', current_timestamp());

-- / Add courses
INSERT INTO `courses` (`id`, `name`, `abbreviation`, `duration`, `semester`, `cost`, `registered_date`) VALUES 
(NULL, 'Bachelor in Business Studies', 'BBS', '4', '4', '100000', current_timestamp()), 
(NULL, 'Bachelor of Arts in Social Works', 'BASW', '4', '4', '200000', current_timestamp()), 
(NULL, 'Class 11', 'XI', '1', '1', '50000', current_timestamp()), 
(NULL, 'Class 12', 'XII', '1', '1', '80000', current_timestamp()),
(NULL, 'Bachelor in Computer Application', 'BCA', '4', '8', '360000', current_timestamp());

-- / Add Subjects
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