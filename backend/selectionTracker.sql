use selectiontracker;

INSERT INTO roles 
(roleid, role_name, role_functions, remarks) 
VALUES
(1, 'Admin', 'Admin rights for the application', NULL),
(2, 'Staff-PMO', 'PMO', 'PMO'),
(3, 'Staff-HR', 'HR', 'HR'),
(4, 'Staff-Other', 'Any other employee', 'Do specify');

INSERT INTO user (psid, role_id, user_manager_id, password, last_login, last_logout) VALUES
(10713037,1,10713037,'Sachin@12',NOW(),NOW()),
(10820934, 1, 10820934, 'Harshi@12', NOW(), NOW()),
(10820984, 1, 10713037, 'Adity@12', NOW(), NOW());

INSERT INTO hsbc_roles 
(ref, name, role_title, grade) 
VALUES
(1, 'India', 'Administration (GCB6 Equivalent)', 6),
(2, 'India', 'Administration (GCB7 Equivalent)', 7),
(3, 'India', 'Administration (GCB8 Equivalent)', 8),
(4, 'India', 'Administration Management (GCB4 Equivalent)', 4),
(5, 'India', 'Administration Management (GCB5 Equivalent)', 5),
(6, 'India', 'Agile Business Analyst (GCB4 Equivalent)', 4),
(7, 'India', 'Agile Business Analyst (GCB5 Equivalent)', 5),
(8, 'India', 'Agile Business Analyst (GCB6 Equivalent)', 6),
(9, 'India', 'Agile Business Analyst (GCB7 Equivalent)', 7),
(10, 'India', 'Agile Business Analyst (GCB8 Equivalent)', 8),
(11, 'India', 'Agile Lead (GCB4 Equivalent)', 4),
(12, 'India', 'Agile Lead (GCB5 Equivalent)', 5),
(13, 'India', 'Agile Lead (GCB6 Equivalent)', 6),
(14, 'India', 'Bus Admin and Operational Mgmt (GCB2 Equivalent)', 2),
(15, 'India', 'Bus Admin and Operational Mgmt (GCB3 Equivalent)', 3),
(16, 'India', 'Bus Admin and Operational Mgmt (GCB4 Equivalent)', 4),
(17, 'India', 'Bus Admin and Operational Mgmt (GCB5 Equivalent)', 5),
(18, 'India', 'Chief Architecture (GCB3 Equivalent)', 3),
(19, 'India', 'Chief Architecture (GCB4 Equivalent)', 4),
(20, 'India', 'Chief Operating Officer (GCB0 Equivalent)', 0),
(21, 'India', 'Chief Operating Officer (GCB1 Equivalent)', 1),
(22, 'India', 'Command Centre Management  (GCB3 Equivalent)', 3),
(23, 'India', 'Command Centre Management  (GCB4 Equivalent)', 4),
(24, 'India', 'Command Centre Management  (GCB5 Equivalent)', 5),
(25, 'India', 'Command Centre Operations (GCB5 Equivalent)', 5),
(26, 'India', 'Command Centre Operations (GCB6 Equivalent)', 6),
(27, 'India', 'Command Centre Operations (GCB7 Equivalent)', 7),
(28, 'India', 'Command Centre Operations (GCB8 Equivalent)', 8),
(29, 'India', 'Command Centre Team Lead (GCB5 Equivalent)', 5),
(30, 'India', 'Command Centre Team Lead (GCB6 Equivalent)', 6),
(31, 'India', 'Cybersecurity Analysis (GCB5 Equivalent)', 5),
(32, 'India', 'Cybersecurity Analysis (GCB6 Equivalent)', 6),
(33, 'India', 'Cybersecurity Analysis (GCB7 Equivalent)', 7),
(34, 'India', 'Cybersecurity Analysis (GCB8 Equivalent)', 8),
(35, 'India', 'Cybersecurity Governance (GCB5 Equivalent)', 5),
(36, 'India', 'Cybersecurity Governance (GCB6 Equivalent)', 6),
(37, 'India', 'Cybersecurity Management (GCB3 Equivalent)', 3),
(38, 'India', 'Cybersecurity Management (GCB4 Equivalent)', 4),
(39, 'India', 'Cybersecurity Management (GCB5 Equivalent)', 5),
(40, 'India', 'Cybersecurity Subject Matter  (GCB4 Equivalent)', 4),
(41, 'India', 'Data Analytics (GCB3 Equivalent)', 3),
(42, 'India', 'Data Analytics (GCB4 Equivalent)', 4),
(43, 'India', 'Data Analytics (GCB5 Equivalent)', 5),
(44, 'India', 'Data Analytics (GCB6 Equivalent)', 6),
(45, 'India', 'Data Analytics (GCB7 Equivalent)', 7),
(46, 'India', 'Data Governance Management (GCB3 Equivalent)', 3),
(47, 'India', 'Data Governance Management (GCB4 Equivalent)', 4),
(48, 'India', 'Data Governance Management (GCB5 Equivalent)', 5),
(49, 'India', 'Data Management (GCB3 Equivalent)', 3),
(50, 'India', 'Data Management (GCB4 Equivalent)', 4),
(51, 'India', 'Data Process and Maintenance (GCB4 Equivalent)', 4),
(52, 'India', 'Data Process and Maintenance (GCB5 Equivalent)', 5),
(53, 'India', 'Data Process and Maintenance (GCB6 Equivalent)', 6),
(54, 'India', 'Data Scenario and Modelling (GCB6 Equivalent)', 6),
(55, 'India', 'Data Scenario and Modelling (GCB7 Equivalent)', 7),
(56, 'India', 'Data Science (GCB4 Equivalent)', 4),
(57, 'India', 'Data Science (GCB5 Equivalent)', 5),
(58, 'India', 'Development Engineering (GCB5 Equivalent)', 5),
(59, 'India', 'Development Engineering (GCB6 Equivalent)', 6),
(60, 'India', 'Development Engineering (GCB7 Equivalent)', 7),
(61, 'India', 'Domain Architecture (GCB3 Equivalent)', 3),
(62, 'India', 'Domain Architecture (GCB4 Equivalent)', 4),
(63, 'India', 'Domain Architecture (GCB5 Equivalent)', 5),
(64, 'India', 'Domain Architecture (GCB6 Equivalent)', 6),
(65, 'India', 'Enterprise Architecture (GCB3 Equivalent)', 3),
(66, 'India', 'Enterprise Architecture (GCB4 Equivalent)', 4),
(67, 'India', 'Executive Assistant (GCB5 Equivalent)', 5),
(68, 'India', 'Executive Assistant (GCB6 Equivalent)', 6),
(69, 'India', 'Executive Assistant (GCB7 Equivalent)', 7),
(70, 'India', 'Full Stack Engineering (GCB4 Equivalent)', 4),
(71, 'India', 'Full Stack Engineering (GCB5 Equivalent)', 5),
(72, 'India', 'Full Stack Engineering (GCB6 Equivalent)', 6),
(73, 'India', 'Full Stack Engineering (GCB7 Equivalent)', 7),
(74, 'India', 'Geographic COO (HOST) (GCB2 Equivalent)', 2),
(75, 'India', 'Geographic COO (HOST) (GCB3 Equivalent)', 3),
(76, 'India', 'Global COO (Global Function) (GCB2 Equivalent)', 2),
(77, 'India', 'Global COO (Global Function) (GCB3 Equivalent)', 3),
(78, 'India', 'Global Strategic Investments  (GCB3 Equivalent)', 3),
(79, 'India', 'Global Strategic Investments  (GCB4 Equivalent)', 4),
(80, 'India', 'Global Strategic Investments  (GCB5 Equivalent)', 5),
(81, 'India', 'Infra Client Services (GCB4 Equivalent)', 4),
(82, 'India', 'Infra Client Services (GCB5 Equivalent)', 5),
(83, 'India', 'Infra Client Services (GCB6 Equivalent)', 6),
(84, 'India', 'Infra Client Services (GCB7 Equivalent)', 7),
(85, 'India', 'Infra Data Centres and Ops (GCB4 Equivalent)', 4),
(86, 'India', 'Infra Data Centres and Ops (GCB5 Equivalent)', 5),
(87, 'India', 'Infra Data Centres and Ops (GCB6 Equivalent)', 6),
(88, 'India', 'Infra Data Centres and Ops (GCB7 Equivalent)', 7),
(89, 'India', 'Infra Enterprise Services (GCB4 Equivalent)', 4),
(90, 'India', 'Infra Enterprise Services (GCB5 Equivalent)', 5),
(91, 'India', 'Infra Enterprise Services (GCB6 Equivalent)', 6),
(92, 'India', 'Infra Enterprise Services (GCB7 Equivalent)', 7),
(93, 'India', 'Infra Identity and Access Mgmt (GCB4 Equivalent)', 4),
(94, 'India', 'Infra Identity and Access Mgmt (GCB5 Equivalent)', 5),
(95, 'India', 'Infra Identity and Access Mgmt (GCB6 Equivalent)', 6),
(96, 'India', 'Infra Identity and Access Mgmt (GCB7 Equivalent)', 7),
(97, 'India', 'Infra Identity and Access Mgmt (GCB8 Equivalent)', 8),
(98, 'India', 'Infra Service Management (GCB4 Equivalent)', 4),
(99, 'India', 'Infra Service Management (GCB5 Equivalent)', 5),
(100, 'India', 'Infra Service Management (GCB6 Equivalent)', 6),
(101, 'India', 'Infra Service Management (GCB7 Equivalent)', 7),
(102, 'India', 'Infra Technical Expert (GCB4 Equivalent)', 4),
(103, 'India', 'Infra Telecom Services (GCB4 Equivalent)', 4),
(104, 'India', 'Infra Telecom Services (GCB5 Equivalent)', 5),
(105, 'India', 'Infra Telecom Services (GCB6 Equivalent)', 6),
(106, 'India', 'Infra Telecom Services (GCB7 Equivalent)', 7),
(107, 'India', 'Infrastructure Management (GCB3 Equivalent)', 3),
(108, 'India', 'Infrastructure Management (GCB4 Equivalent)', 4),
(109, 'India', 'Innovation Partner Management (GCB3 Equivalent)', 3),
(110, 'India', 'Innovation Partner Management (GCB4 Equivalent)', 4),
(111, 'India', 'Innovation Partner Management (GCB5 Equivalent)', 5),
(112, 'India', 'Innovation Quality Management (GCB3 Equivalent)', 3),
(113, 'India', 'Innovation Quality Management (GCB4 Equivalent)', 4),
(114, 'India', 'Innovation Quality Management (GCB5 Equivalent)', 5),
(115, 'India', 'Innovation Relationship Mgmt  (GCB3 Equivalent)', 3),
(116, 'India', 'Innovation Relationship Mgmt  (GCB4 Equivalent)', 4),
(117, 'India', 'Innovation Research (GCB3 Equivalent)', 3),
(118, 'India', 'Innovation Research (GCB4 Equivalent)', 4),
(119, 'India', 'Innovation Research (GCB5 Equivalent)', 5),
(120, 'India', 'Innovation Risk Governance (GCB4 Equivalent)', 4),
(121, 'India', 'Innovation Risk Governance (GCB5 Equivalent)', 5),
(122, 'India', 'Operations Engineering (GCB6 Equivalent)', 6),
(123, 'India', 'Operations Engineering (GCB7 Equivalent)', 7),
(124, 'India', 'Operations Engineering (GCB8 Equivalent)', 8),
(125, 'India', 'Personal Assistant (GCB5 Equivalent)', 5),
(126, 'India', 'Personal Assistant (GCB6 Equivalent)', 6),
(127, 'India', 'Personal Assistant (GCB7 Equivalent)', 7),
(128, 'India', 'Personal Assistant (GCB8 Equivalent)', 8),
(129, 'India', 'Platform Architecture (GCB4 Equivalent)', 4),
(130, 'India', 'Platform Architecture (GCB5 Equivalent)', 5),
(131, 'India', 'Portfolio Architecture (GCB3 Equivalent)', 3),
(132, 'India', 'Portfolio Architecture (GCB4 Equivalent)', 4),
(133, 'India', 'Portfolio Architecture (GCB5 Equivalent)', 5),
(134, 'India', 'Product Architecture (GCB3 Equivalent)', 3),
(135, 'India', 'Product Architecture (GCB4 Equivalent)', 4),
(136, 'India', 'Product Owner (GCB2 Equivalent)', 2),
(137, 'India', 'Product Owner (GCB3 Equivalent)', 3),
(138, 'India', 'Product Owner (GCB4 Equivalent)', 4),
(139, 'India', 'Product Owner (GCB5 Equivalent)', 5),
(140, 'India', 'Programme Office Technology (GCB5 Equivalent)', 5),
(141, 'India', 'Programme Office Technology (GCB6 Equivalent)', 6),
(142, 'India', 'Programme Office Technology (GCB7 Equivalent)', 7),
(143, 'India', 'Service Management (GCB4 Equivalent)', 4),
(144, 'India', 'Service Management (GCB5 Equivalent)', 5),
(145, 'India', 'Service Management (GCB6 Equivalent)', 6),
(146, 'India', 'Service Management (GCB7 Equivalent)', 7),
(147, 'India', 'Service Management (GCB8 Equivalent)', 8),
(148, 'India', 'Service Management Discipline (GCB3 Equivalent)', 3),
(149, 'India', 'Service Management Discipline (GCB4 Equivalent)', 4),
(150, 'India', 'Service Management Discipline (GCB5 Equivalent)', 5),
(151, 'India', 'Service Management Discipline (GCB6 Equivalent)', 6),
(152, 'India', 'Service Management Discipline (GCB7 Equivalent)', 7),
(153, 'India', 'Service Management Discipline (GCB8 Equivalent)', 8),
(154, 'India', 'Service Management Incident (GCB4 Equivalent)', 4),
(155, 'India', 'Service Management Incident (GCB5 Equivalent)', 5),
(156, 'India', 'Service Management Incident (GCB6 Equivalent)', 6),
(157, 'India', 'Service Management Incident (GCB7 Equivalent)', 7),
(158, 'India', 'Service Mgmt Service Desk (GCB4 Equivalent)', 4),
(159, 'India', 'Service Mgmt Service Desk (GCB5 Equivalent)', 5),
(160, 'India', 'Service Mgmt Service Desk (GCB6 Equivalent)', 6),
(161, 'India', 'Service Mgmt Service Desk (GCB7 Equivalent)', 7),
(162, 'India', 'Service Mgmt Service Desk (GCB8 Equivalent)', 8),
(163, 'India', 'Service Mgmt Service Quality (GCB3 Equivalent)', 3),
(164, 'India', 'Service Mgmt Service Quality (GCB4 Equivalent)', 4),
(165, 'India', 'Service Mgmt Service Quality (GCB5 Equivalent)', 5),
(166, 'India', 'Solution Architecture (GCB4 Equivalent)', 4),
(167, 'India', 'Solution Architecture (GCB5 Equivalent)', 5),
(168, 'India', 'Solution Architecture (GCB6 Equivalent)', 6),
(169, 'India', 'Specialist Engineering (GCB4 Equivalent)', 4),
(170, 'India', 'Specialist Engineering (GCB5 Equivalent)', 5),
(171, 'India', 'Specialist Engineering (GCB6 Equivalent)', 6),
(172, 'India', 'Specialist Engineering (GCB7 Equivalent)', 7),
(173, 'India', 'Tech Programme Management  (GCB2 Equivalent)', 2),
(174, 'India', 'Tech Programme Management  (GCB3 Equivalent)', 3),
(175, 'India', 'Tech Programme Management  (GCB4 Equivalent)', 4),
(176, 'India', 'Tech Strategy and Partnerships (GCB3 Equivalent)', 3),
(177, 'India', 'Tech Strategy and Partnerships (GCB4 Equivalent)', 4),
(178, 'India', 'Tech Strategy and Partnerships (GCB5 Equivalent)', 5),
(179, 'India', 'Technical Product Management (GCB4 Equivalent)', 4),
(180, 'India', 'Technical Product Management (GCB5 Equivalent)', 5),
(181, 'India', 'Technology CIO Function Mgmt (GCB1 Equivalent)', 1),
(182, 'India', 'Technology CIO Function Mgmt (GCB2 Equivalent)', 2),
(183, 'India', 'Technology Country Management (GCB3 Equivalent)', 3),
(184, 'India', 'Technology Country Management (GCB4 Equivalent)', 4),
(185, 'India', 'Technology Country Management (GCB5 Equivalent)', 5),
(186, 'India', 'Technology Practices (GCB3 Equivalent)', 3),
(187, 'India', 'Technology Practices (GCB4 Equivalent)', 4),
(188, 'India', 'Technology Practices (GCB5 Equivalent)', 5),
(189, 'India', 'Technology Project Management (GCB3 Equivalent)', 3),
(190, 'India', 'Technology Project Management (GCB4 Equivalent)', 4),
(191, 'India', 'Technology Project Management (GCB5 Equivalent)', 5),
(192, 'India', 'Technology Region Management (GCB3 Equivalent)', 3),
(193, 'India', 'Technology Region Management (GCB4 Equivalent)', 4),
(194, 'India', 'Technology Service Lines Mgmt (GCB3 Equivalent)', 3),
(195, 'India', 'Technology Service Lines Mgmt (GCB4 Equivalent)', 4),
(196, 'India', 'Test Engineering (GCB5 Equivalent)', 5),
(197, 'India', 'Test Engineering (GCB6 Equivalent)', 6),
(198, 'India', 'Test Engineering (GCB7 Equivalent)', 7),
(199, 'India', 'User Design (GCB4 Equivalent)', 4),
(200, 'India', 'User Design (GCB5 Equivalent)', 5),
(201, 'India', 'User Design (GCB6 Equivalent)', 6),
(202, 'India', 'User Design (GCB7 Equivalent)', 7);

INSERT INTO employee 
(psid, first_name, middle_name, last_name, grade, location, skill, total_experience, pu, mailid, phone_number,created_by_ps_id, updated_by_ps_id, created_date, updated_date) 
VALUES
(10713037, 'Sachin', NULL, 'Shaha', 'P6', 'Pune', 'Delivery Manager', 20, 'BB', 'sachin.shaha@ltimindtree.com',NULL, NULL, NULL, NOW(), NOW()),
(10820984, 'Aditya', NULL, 'Sonakiya', 'P1', 'Pune', 'Software Engineer', 0.4, 'BB', 'aditya.sonakiya@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10821014, 'Abhijeet', NULL, 'Verma', 'P1', 'Pune', 'Software Engineer', 0.4, 'BB', 'abhijeet.verma@ltimindtree.com',NULL, NULL, NULL, NOW(), NOW()),
(10715126, 'Monali', NULL, 'Jangam', 'P4', 'Pune', 'Java Fullstack', 16, 'BB', 'monali.jangam@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10825932, 'Bhakti', 'Anand', 'Kulkarni', 'M4', 'Pune', 'Scrum Management', 1, 'BB', 'bhakti.kulkarni@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830001, 'Rohit', NULL, 'Sharma', 'P2', 'Mumbai', 'Data Analyst', 2, 'BB', 'rohit.sharma@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830002, 'Priya', NULL, 'Singh', 'P3', 'Bangalore', 'Project Manager', 5, 'BB', 'priya.singh@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830003, 'Amit', NULL, 'Patel', 'P2', 'Hyderabad', 'QA Engineer', 3, 'BB', 'amit.patel@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830004, 'Neha', NULL, 'Gupta', 'P1', 'Chennai', 'Software Developer', 1, 'BB', 'neha.gupta@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830005, 'Vikas', NULL, 'Kumar', 'P4', 'Delhi', 'System Analyst', 8, 'BB', 'vikas.kumar@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830006, 'Ankit', NULL, 'Jain', 'P2', 'Pune', 'Business Analyst', 2, 'BB', 'ankit.jain@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830007, 'Sneha', NULL, 'Reddy', 'P3', 'Hyderabad', 'DevOps Engineer', 4, 'BB', 'sneha.reddy@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830008, 'Rahul', NULL, 'Mehta', 'P1', 'Mumbai', 'Frontend Developer', 1, 'BB', 'rahul.mehta@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830009, 'Kiran', NULL, 'Patil', 'P2', 'Bangalore', 'Backend Developer', 2, 'BB', 'kiran.patil@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830010, 'Megha', NULL, 'Sharma', 'P3', 'Chennai', 'Fullstack Developer', 3, 'BB', 'megha.sharma@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830011, 'Suresh', NULL, 'Kumar', 'P4', 'Delhi', 'Network Engineer', 5, 'BB', 'suresh.kumar@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
-- (10830012, 'Anjali', NULL, 'Verma', 'P1', 'Pune', 'QA Tester', 1, 'BB', 'anjali.verma@ltimindtree.com', 10713037, 10713037, NOW(), NOW()),
(10830013, 'Vivek', NULL, 'Singh', 'P2', 'Hyderabad', 'Database Administrator', 2, 'BB', 'vivek.singh@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830014, 'Pooja', NULL, 'Rao', 'P3', 'Mumbai', 'UI/UX Designer', 3, 'BB', 'pooja.rao@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW()),
(10830015, 'Aakash', NULL, 'Mishra', 'P4', 'Bangalore', 'Cloud Engineer', 4, 'BB', 'aakash.mishra@ltimindtree.com',NULL, 10713037, 10713037, NOW(), NOW());

INSERT INTO candidate
(candidate_id,phone_number,vendor_id, first_name, middle_name, last_name, ltionboarding_date, created_by_ps_id, updated_by_ps_id, create_date, update_date) 
VALUES
(1,1082980311, 1,'Harshita', NULL, 'Tripathi', '2025-04-23', 10713037, 10713037, '2025-04-23', NOW()),
(2,1082058123,1, 'Komal', 'Vitthal', 'More', '2025-04-23', 10713037, 10713037, '2025-04-23', NOW()),
(3,1083000611,1, 'Ankit', NULL, 'Jain', '2025-10-01', 10713037, 10713037, '2025-10-01', NOW()),
(4,1083000721,1, 'Sneha', NULL, 'Reddy', '2025-10-05', 10713037, 10713037, '2025-10-05', NOW()),
(5,1083000821,1, 'Rahul', NULL, 'Mehta', '2025-10-10', 10713037, 10713037, '2025-10-10', NOW()),
(6,1083000911,1, 'Kiran', NULL, 'Patil', '2025-10-15', 10713037, 10713037, '2025-10-15', NOW()),
(7,1083001023,1, 'Megha', NULL, 'Sharma', '2025-10-20', 10713037, 10713037, '2025-10-20', NOW()),
(8,1083001121,1, 'Suresh', NULL, 'Kumar', '2025-10-25', 10713037, 10713037, '2025-10-25', NOW()),
(9,1083001223,1, 'Anjali', NULL, 'Verma', '2025-10-30', 10713037, 10713037, '2025-10-30', NOW()),
(10,1083001322,1, 'Vivek', NULL, 'Singh', '2025-11-05', 10713037, 10713037, '2025-11-05', NOW());

INSERT INTO vendor (vendor_id, vendor_name)
VALUES
(1,'Not Applicable'),
(2, 'Ria'),
(3, 'CSI Global'),
(4, 'Bil Vantis'),
(5, 'Copia'),
(6, 'Bowmen India'),
(7, 'Bowmen UK'),
(8, 'EY'),
(9, 'Aligne'),
(10, 'Saki Soft'),
(11, 'Incube'),
(12, 'Finsol');


INSERT INTO vendor_candidate (vendor_candidate_id,phone_number,vendor_id , first_name, middle_name, last_name, ltionboarding_date, created_by_ps_id, updated_by_ps_id, create_date, update_date)
VALUES
(1,2321322222, 1, 'John', 'A.', 'Doe', '2025-01-15', 10713037, 10713037, '2025-01-01', '2025-01-10'),
(2,8887877788, 2, 'Jane', 'B.', 'Smith', '2025-01-20', 10713037, 10713037, '2025-01-02', '2025-01-11');
-- (3,8787788898, 3, 'Michael', 'C.', 'Johnson', '2025-01-25', 10713037, 10713037, '2025-01-03', '2025-01-12'),
-- (4,8979888778, 4, 'Emily', 'D.', 'Williams', '2025-02-01', 10713037, 10713037, '2025-01-04', '2025-01-13'),
-- (5,8799989887, 5, 'David', 'E.', 'Brown', '2025-02-05', 10713037, 10713037, '2025-01-05', '2025-01-14'),
-- (6,8979786678, 6, 'Sarah', 'F.', 'Jones', '2025-02-10', 10713037, 10713037, '2025-01-06', '2025-01-15'),
-- (7,7879978898, 7, 'Daniel', 'G.', 'Garcia', '2025-02-15', 10713037, 10713037, '2025-01-07', '2025-01-16'),
-- (8,8977897998, 8, 'Sophia', 'H.', 'Martinez', '2025-02-20', 10713037, 10713037, '2025-01-08', '2025-01-17'),
-- (9,8899978997, 9, 'James', 'I.', 'Hernandez', '2025-02-25', 10713037, 10713037, '2025-01-04', '2025-01-18'),
-- (10,9898980889, 10, 'Olivia', 'J.', 'Lopez', '2025-03-01', 10713037, 10713037, '2025-01-10', '2025-01-19'),
-- (11,9889898988, 11, 'William', 'K.', 'Wilson', '2025-03-05', 10713037, 10713037, '2025-01-11', '2025-01-20');


INSERT INTO onboarding_status 
(status_id, onboarding_status, remarks) 
VALUES
(1, 'CTool Pending', 'The onboarding process has not yet started.'),
(2, 'CTool Recieved', 'Received'),
(3, 'Tagging Completed', 'Successfully tagged'),
(4, 'Tech Selection Done', 'Tech selection completed'),
(5, 'DOJ Recieved', 'DOJ has been received by the candidate'),
(6, 'Onboarding Completed', 'The onboarding process is successfully completed.'),
(7, 'Tagging Error', 'Issue during onboarding process'),
(8, 'Rate Approval Pending', 'Rate approval is pending'),
(9, 'Rate To Be Changed', 'In case the rate needs to be changed'),
(10, 'Candidate not yet joined', 'Candidate has not yet joined'),
(11, 'Drop Out Case', 'Candidate dropped out');

INSERT INTO bgvstatus
(bgv_status_id,bgv_status,remarks) 
VALUES
(1,"Pending","BGV process is pending"),
(2,"BGV Initiated","BGV has been initiated"),
(3,"In Progress","Background verification is in progress."),
(4,"Minor Discrepancy","A minor discrepancy was observed"),
(5,"Major Discrepancy","A major discrepancy was observed"),
(6,"Offer Yet to be Released","Offer is under process and is not released yet"),
(7,"Interim Closed","Background verfication has been closed");

INSERT INTO candidate_status VALUES
(1,"Joined","candidate joined"),
(2,"Dropped","candidate dropped"),
(3,"Resigned","Resigned"),
(4,"Joined date delayed"," candidate joined date delayed"),
(5,"Candidate yet to join Parent Company","Candidate yet to join Parent Company");

INSERT INTO lob (lob_id, lob_name, remarks, created_by, updated_by, created_date, update_date,delivery_manager, salespoc,hsbchead,active) VALUES
(1, 'Business & Data Architecture', 'Business & Data Architecture', 10713037, 10713037, NOW(), NOW(),NULL,NULL,NULL,false),
(2, 'CTO', 'Chief Technology Officer', 10713037, 10713037, NOW(), NOW(),'Arvind Deogade','Anand Devi','abcd',true),
(3, 'Cybersecurity', 'Cybersecurity Assessment and testing', 10713037, 10713037, NOW(), NOW(),'Arvind Deogade','Anand Devi','abcd',true),
(4, 'Enterprise Technology', 'Finance & banking', 10713037, 10713037, NOW(), NOW(),'Rupali Khedekar','Anand Devi','Sameer Sagade',true),
(5, 'Global Ops & Automation Tech', 'Automation Technology', 10713037, 10713037, NOW(), NOW(),'Mayuresh Nirantar','Anand Devi','abcd',true),
(6, 'Group Data Technology', 'Group data Technology', 10713037, 10713037, NOW(), NOW(),'Chinni Krishna Nakka','Kinshuk Awasthi','abcd',true),
(7, 'HDPI', 'Pixel density', 10713037, 10713037, NOW(), NOW(),NULL,NULL,NULL,false),
(8, 'INM', 'INM', 10713037, 10713037, NOW(), NOW(),'Mayuresh Nirantar','Anand Devi','abcd',true),
(9, 'Markets & Sec Services Tech', 'Services', 10713037, 10713037, NOW(), NOW(),'Abhijeet Sureshchandra More','Ajay Pillai','abcd',true),
(10, 'MDS & DAO ESG', 'Data& Analytics', 10713037, 10713037, NOW(), NOW(),NULL,NULL,NULL,false),
(11, 'Regional CIO - Europe', 'Regional CIO for Europe', 10713037, 10713037, NOW(), NOW(),'Arvind Deogade','Anand Devi','abcd',true),
(12, 'SAB Technology', 'SAB Tech', 10713037, 10713037, NOW(), NOW(),'Rupali Khedekar','Anand Devi','abcd',true),
(13, 'Strategic Services Technology', 'SST Group', 10713037, 10713037, NOW(), NOW(),'Rupali Khedekar','Anand Devi','abcd',true),
(14, 'Technology COO', 'Tech COO', 10713037, 10713037, NOW(), NOW(),'Arvind Deogade','Anand Devi','abcd',true),
(15, 'Wholesale Technology', 'WS Tech', 10713037, 10713037, NOW(), NOW(),'Saber Sarode','Ajay Pillai','Smita Jamalamadaka',true),
(16, 'WPB Technology', 'WPB', 10713037, 10713037, NOW(), NOW(),'Aniruddha Deshpande','Nishant Sharma','abcd',true),
(17, 'Wholesale Payments', 'Wholesale Payments', 10713037, 10713037, NOW(), NOW(),'Saber Sarode','Rajiv Lakhanpal','Smita Jamalamadaka',true);

INSERT INTO sublob 
(sublobid, lob_id, sub_lob_name, created_by_ps_id, update_by_ps_id, create_date, update_date) 
VALUES
(11, 1, 'Architecture Stds & Gov', 10713037, 10713037, NOW(), NOW()),
(12,2,'Colleague & Collaboration',10713037,10713037,NOW(),NOW()),
(22,2,'Dev Ops Services',10713037,10713037,NOW(),NOW()),
(32,2,'Engineering & PE',10713037,10713037,NOW(),NOW()),
(42,2,'Enterprise Infrastructure',10713037,10713037,NOW(),NOW()),
(13, 3, 'Cyber Assessment & Testing', 10713037, 10713037, NOW(), NOW()),
(14,4,'Colleague Experience Tech',10713037,10713037,NOW(),NOW()),
(24,4,'Core Banking',10713037,10713037,NOW(),NOW()),
(34,4,'Cross Functions Technology',10713037,10713037,NOW(),NOW()),
(44,4,'Finance Technology',10713037,10713037,NOW(),NOW()),
(54,4,'Risk & Compliance Technology',10713037,10713037,NOW(),NOW()),
(64,4,'Risk-Compliance Technology',10713037,10713037,NOW(),NOW()),
(15,5,'Automation Platforms',10713037,10713037,NOW(),NOW()),
(25,5,'Ops Management',10713037,10713037,NOW(),NOW()),
(35,5,'Tech Change Delivery',10713037,10713037,NOW(),NOW()),
(16,6,'GDT BI & Visualization Tech',10713037,10713037,NOW(),NOW()),
(26,6,'GDT Data Asset Tech & Control',10713037,10713037,NOW(),NOW()),
(36,6,'GDT Data Management Tech',10713037,10713037,NOW(),NOW()),
(46,6,'GDT Data Provisioning Tech',10713037,10713037,NOW(),NOW()),
(56,6,'GDT ET',10713037,10713037,NOW(),NOW()),
(66,6,'GDT MENAT, EU & UK',10713037,10713037,NOW(),NOW()),
(76,6,'GDT WPB',10713037,10713037,NOW(),NOW()),
(86,6,'GDT WS, MSS and ESG',10713037,10713037,NOW(),NOW()),
(17, 7, 'HDPI', 10713037, 10713037, NOW(), NOW()),
(18, 8, 'INM', 10713037, 10713037, NOW(), NOW()),
(19,9,'Equities Technology',10713037,10713037,NOW(),NOW()),
(29,9,'Fin Data & Reg Reporting Tech',10713037,10713037,NOW(),NOW()),
(39,9,'Global Debt Markets Tech',10713037,10713037,NOW(),NOW()),
(49,9,'Markets Treasury Tech',10713037,10713037,NOW(),NOW()),
(59,9,'MSS Central Services',10713037,10713037,NOW(),NOW()),
(69,9,'MSS Operations Technology',10713037,10713037,NOW(),NOW()),
(79,9,'Securities Financing Tech',10713037,10713037,NOW(),NOW()),
(89,9,'Securities Services Tech',10713037,10713037,NOW(),NOW()),
(99,9,'Surveillance & Supervision',10713037,10713037,NOW(),NOW()),
(109,9,'Traded Risk',10713037,10713037,NOW(),NOW()),
(110,10,'ESG Data & Analytics',10713037,10713037,NOW(),NOW()),
(111,11,'Regional Tech - Europe',10713037,10713037,NOW(),NOW()),
(112,12,'SAB Tech',10713037,10713037,NOW(),NOW()),
(113,13,'SST Group Enterprise Arch',10713037,10713037,NOW(),NOW()),
(114,14,'Tech COO - Enterprise Tech',10713037,10713037,NOW(),NOW()),
(214,14,'Tech Third Party Mgmt',10713037,10713037,NOW(),NOW()),
(115,15,'WS Tech Client Services',10713037,10713037,NOW(),NOW()),
(215,15,'WS Tech Credit & Lending',10713037,10713037,NOW(),NOW()),
(315,15,'WS Tech Digital',10713037,10713037,NOW(),NOW()),
(415,15,'WS Tech FEM&S',10713037,10713037,NOW(),NOW()),
(515,15,'WS Tech General',10713037,10713037,NOW(),NOW()),
(615,15,'WS Tech Global Banking',10713037,10713037,NOW(),NOW()),
(715,15,'WS Tech Global Trade and RF',10713037,10713037,NOW(),NOW()),
(815,15,'WS Tech Regional',10713037,10713037,NOW(),NOW()),
(915,15,'WS Tech Shared Services',10713037,10713037,NOW(),NOW()),
(1015,15,'WSIT General',10713037,10713037,NOW(),NOW()),
(116,16,'Enabler Platforms',10713037,10713037,NOW(),NOW()),
(216,16,'GPBW and AMG Tech',10713037,10713037,NOW(),NOW()),
(316,16,'Insurance',10713037,10713037,NOW(),NOW()),
(416,16,'Retail Banking Technology',10713037,10713037,NOW(),NOW()),
(516,16,'WPB Technology Management',10713037,10713037,NOW(),NOW()),
(616,16,'WPB UK Tech',10713037,10713037,NOW(),NOW()),
(117,17,'WS Global Payment Solutions',10713037,10713037,NOW(),NOW());

INSERT INTO selection_details (
  ps_id,candidate_id,vendor_candidate_id,base_bu,lob_id,sub_lob_id,irm,hsbc_role_id,created_by,updated_by,hsbcselection_date,
  hsbchiring_manager,pricing_model,hsbctool_id,ctool_received_date,ctool_location,ctool_grade,ctool_tagging_rate,recruiter_name,offer_release_status,
  hsbconboarding_date,tech_selection_date,dojreceived_date,ltionboarding_date,create_date,update_date,candidate_status_date,ctool_start_date,bgv_initiated_date)
VALUES
-- 1. CTO (lob_id 2, active), sublob 12 (active)
(10820984, NULL, NULL, 'BFS', 2, 12, '10825932', 1, 10713037, 10713037, '2023-03-05',
 'Sachin Shaha', 'Time & Material', 108933, '2023-04-02', 'Pune', NULL, NULL, 'Nishant Sharma', 'Pending',
 '2025-04-23', '2025-04-23', '2025-04-23', '2023-02-28', NOW(), NOW(), NULL, NULL, NULL),
-- 2. CTO (lob_id 2, active), sublob 22 (active)
(10715126, NULL, NULL, 'BFS', 2, 22, '10825932', 2, 10713037, 10713037, '2025-03-12',
 'Sachin Shaha', 'Fixed Price', 108933, '2025-04-02', 'Pune', NULL, NULL, 'Nishant Sharma', 'On Hold',
 NULL, NULL, NULL, '2025-04-23', NOW(), NOW(), NULL, NULL, NULL),
-- 3. Group Data Technology (lob_id 6, active), sublob 36 (active)
(10825932, NULL, NULL, 'BFS', 6, 36, '10825932', 3, 10713037, 10713037, '2025-03-18',
 'Sachin Shaha', 'Time & Material', 108933, '2025-04-02', 'Pune', NULL, NULL, 'Nishant Sharma', 'Release',
 '2025-04-23', '2025-04-23', '2025-04-23', '2025-03-01', NOW(), NOW(), NULL, NULL, NULL),
-- 4. CTO (lob_id 2, active), sublob 12 (active)
(NULL, 2, NULL, 'BFS', 2, 12, '10825932', 4, 10713037, 10713037, '2025-03-17',
 'Sachin Shaha', 'Fixed Price', 108933, '2025-04-02', 'Pune', NULL, NULL, 'Nishant Sharma', 'WIP',
 NULL, NULL, NULL, NULL, NOW(), NOW(), NULL, NULL, NULL),
-- 5. Enterprise Technology (lob_id 4, active), sublob 44 (active)
(10830001, NULL, NULL, 'BFS', 4, 44, '10825932', 5, 10713037, 10713037, '2025-03-08',
 'Sachin Shaha', 'Fixed Price', 108934, '2025-04-02', 'Mumbai', NULL, NULL, 'Nishant Sharma', 'Pending',
 '2025-09-23', '2025-09-18', '2025-09-21', '2025-02-28', NOW(), NOW(), NULL, NULL, NULL),
-- 6. Enterprise Technology (lob_id 4, active), sublob 54 (active)
(10830002, NULL, NULL, 'BFS', 4, 54, '10825932', 6, 10713037, 10713037, '2025-03-15',
 'Sachin Shaha', 'Time & Material', 108935, '2025-04-02', 'Bangalore', NULL, NULL, 'Nishant Sharma', 'On Hold',
 '2025-03-20', '2025-03-20', '2025-03-20', '2025-03-01', NOW(), NOW(), NULL, NULL, NULL),
-- 7. Group Data Technology (lob_id 6, active), sublob 66 (active)
(10830003, NULL, NULL, 'BFS', 6, 66, '10825932', 7, 10713037, 10713037, '2025-03-10',
 'Sachin Shaha', 'Fixed Price', 108936, '2025-04-02', 'Hyderabad', NULL, NULL, 'Nishant Sharma', 'Release',
 '2025-03-23', '2025-02-23', '2025-03-23', '2025-03-01', NOW(), NOW(), NULL, NULL, NULL),
-- 8. Group Data Technology (lob_id 6, active), sublob 76 (active)
(10830004, NULL, NULL, 'BFS', 6, 76, '10825932', 8, 10713037, 10713037, '2025-03-14',
 'Sachin Shaha', 'Fixed Price', 108937, '2025-04-02', 'Chennai', NULL, NULL, 'Nishant Sharma', 'Pending',
 '2025-02-23', '2025-01-23', '2025-02-23', '2025-03-01', NOW(), NOW(), NULL, NULL, NULL),
-- 9. Group Data Technology (lob_id 6, active), sublob 86 (active)
(10830005, NULL, NULL, 'BFS', 6, 86, '10825932', 9, 10713037, 10713037, '2025-03-19',
 'Sachin Shaha', 'Fixed Price', 108938, '2025-04-02', 'Delhi', NULL, NULL, 'Nishant Sharma', 'On Hold',
 '2025-03-22', '2025-03-22', '2025-03-22', '2025-03-01', NOW(), NOW(), NULL, NULL, NULL),
-- 10. Markets & Sec Services Tech (lob_id 9, active), sublob 19 (active)
(10830007, NULL, NULL, 'BFS', 9, 19, '10825932', 10, 10713037, 10713037, '2025-03-11',
 'Sachin Shaha', 'Time & Material', 108939, '2025-04-02', 'Bangalore', NULL, NULL, 'Nishant Sharma', 'Release',
 '2025-03-15', '2025-03-15', '2025-03-15', '2025-03-01', NOW(), NOW(), NULL, NULL, NULL),
-- 11. MDS & DAO ESG (lob_id 10, inactive) -- SKIPPED
-- 12. Regional CIO - Europe (lob_id 11, active), sublob 111 (active)
(NULL, 6, NULL, 'BFS', 11, 111, '10825932', 11, 10713037, 10713037, '2025-03-13',
 'Sachin Shaha', 'Time & Material', 108941, '2025-04-02', 'Pune', NULL, NULL, 'Nishant Sharma', 'Pending',
 NULL, NULL, NULL, NULL, NOW(), NOW(), NULL, NULL, NULL),
-- 13. SAB Technology (lob_id 12, active), sublob 112 (active)
(10830010, NULL, NULL, 'BFS', 12, 112, '10825932', 12, 10713037, 10713037, '2025-03-17',
 'Sachin Shaha', 'Fixed Price', 108942, '2025-04-02', 'Chennai', NULL, NULL, 'Nishant Sharma', 'On Hold',
 '2025-03-22', '2025-03-22', '2025-03-22', '2025-03-01', NOW(), NOW(), NULL, NULL, NULL),
-- 14. Strategic Services Technology (lob_id 13, active), sublob 113 (active)
(10830011, NULL, NULL, 'BFS', 13, 113, '10825932', 13, 10713037, 10713037, '2025-03-04',
 'Sachin Shaha', 'Fixed Price', 108943, '2025-04-02', 'Delhi', NULL, NULL, 'Nishant Sharma', 'Release',
 '2025-03-15', '2025-03-15', '2025-03-15', '2025-03-01', NOW(), NOW(), NULL, NULL, NULL),
-- 15. Wholesale Technology (lob_id 15, active), sublob 115 (active)
(10830013, NULL, NULL, 'BFS', 15, 115, '10825932', 15, 10713037, 10713037, '2025-03-18',
 'Sachin Shaha', 'Fixed Price', 108945, '2025-04-02', 'Hyderabad', NULL, NULL, 'Nishant Sharma', 'Pending',
 '2025-03-25', '2025-03-25', '2025-03-25', '2025-03-01', NOW(), NOW(), NULL, NULL, NULL),
-- 16. WPB Technology (lob_id 16, active), sublob 116 (active)
(NULL, 7, NULL, 'BFS', 16, 116, '10825932', 16, 10713037, 10713037, '2025-03-16',
 'Sachin Shaha', 'Time & Material', 108946, '2025-04-02', 'Pune', NULL, NULL, 'Nishant Sharma', 'WIP',
 NULL, NULL, NULL, NULL, NOW(), NOW(), NULL, NULL, NULL),
-- 17. WPB Technology (lob_id 16, active), sublob 316 (active)
(10830014, NULL, NULL, 'BFS', 16, 316, '10825932', 17, 10713037, 10713037, '2025-02-28',
 'Sachin Shaha', 'Fixed Price', 108947, '2025-04-02', 'Chennai', NULL, NULL, 'Nishant Sharma', 'Pending',
 '2025-03-05', '2025-02-05', '2025-02-28', '2025-02-20', NOW(), NOW(), NULL, NULL, NULL),
-- 18. Wholesale Technology (lob_id 15, active), sublob 715 (active)
(10830015, NULL, NULL, 'BFS', 15, 715, '10825932', 18, 10713037, 10713037, '2025-02-15',
 'Sachin Shaha', 'Fixed Price', 108948, '2025-04-02', 'Delhi', NULL, NULL, 'Nishant Sharma', 'On Hold',
 '2025-02-20', '2025-02-20', '2025-02-20', '2025-02-10', NOW(), NOW(), NULL, NULL, NULL),
-- 19. INM (lob_id 8, active), sublob 18 (active)
(NULL, 8, NULL, 'BFS', 8, 18, '10825932', 19, 10713037, 10713037, '2025-01-30',
 'Sachin Shaha', 'Time & Material', 108949, '2025-04-02', 'Bangalore', NULL, NULL, 'Nishant Sharma', 'Release',
 NULL, NULL, '2025-01-20', NULL, NOW(), NOW(), NULL, NULL, NULL);

INSERT INTO tagging_details 
(ps_id, candidate_id, onboarding_status_id, bgv_status_id, created_by_psid, updated_by_psid, status_remarks, create_date, update_date) 
VALUES
(10820984, NULL, 4, 2, 10713037, 10713037, 'BGV Initiated', NOW(), NOW()),
(NULL, 2, 4, 3, 10713037, 10713037, 'BGV in progress', NOW(), NOW()),
(10715126, NULL, 5, 4, 10713037, 10713037, 'Major discrepancy found', NOW(), NOW()),
(10825932, NULL, 6, 6, 10713037, 10713037, 'Offer yet to be released', NOW(), NOW()),
(10830001, NULL, 5, 6, 10713037, 10713037, 'Interim cleared', NOW(), NOW()),
(10830002, NULL, 6, 3, 10713037, 10713037, 'Pending with employee', NOW(), NOW()),
(10830003, NULL, 4, 5, 10713037, 10713037, 'BGV initiated', NOW(), NOW()),
(10830004, NULL, 6, 7, 10713037, 10713037, 'Minor discrepancy found', NOW(), NOW()),
(10830005, NULL, 4, 2, 10713037, 10713037, 'Initial tagging', NOW(), NOW()),
(10830007, NULL, 4, 3, 10713037, 10713037, 'BGV in progress', NOW(), NOW()),
(10830010, NULL, 5, 6, 10713037, 10713037, 'Offer yet to be released', NOW(), NOW()),
(10830011, NULL, 6, 6, 10713037, 10713037, 'Interim cleared', NOW(), NOW()),
(10830013, NULL, 4, 5, 10713037, 10713037, 'BGV initiated', NOW(), NOW()),
(10830014, NULL, 5, 7, 10713037, 10713037, 'Minor discrepancy found', NOW(), NOW()),
(10830015, NULL, 6, 2, 10713037, 10713037, 'BGV in progress', NOW(), NOW()),
(NULL, 8, 4, 3, 10713037, 10713037, 'BGV in progress', NOW(), NOW());



Select emp.psid as id ,emp.first_name,emp.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status from employee emp,lob lob,
selection_details selection,onboarding_status obs,BGVStatus bgvs , tagging_details td
where selection.created_by = 10713037
      and selection.ps_id=emp.psid
	  and selection.lob_id=lob.lob_id	  
	  and emp.psid=td.ps_id
	  and td.onboarding_status_id=obs.status_id
	  and td.bgv_status_id=bgvs.bgv_status_id
Union	  
Select cnd.vendor_id as id,cnd.first_name,cnd.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status from candidate cnd,lob lob,
selection_details selection,onboarding_status obs,BGVStatus bgvs , tagging_details td
where selection.created_by = 10713037
      and selection.candidate_id=cnd.candidate_id
      and selection.lob_id=lob.lob_id
	  and cnd.candidate_id=td.candidate_id
	  and td.onboarding_status_id=obs.status_id
	  and td.bgv_status_id=bgvs.bgv_status_id
Union
Select vc.vendor_id as id,vc.first_name,vc.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status from vendor_candidate vc,lob lob,
selection_details selection,onboarding_status obs,BGVStatus bgvs , tagging_details td
where selection.created_by = 10713037
      and selection.vendor_candidate_id=vc.vendor_candidate_id
      and selection.lob_id=lob.lob_id
	  and vc.vendor_candidate_id=td.vendor_candidate_id
	  and td.onboarding_status_id=obs.status_id
	  and td.bgv_status_id=bgvs.bgv_status_id;

-- Select emp.psid as id ,emp.first_name,emp.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status 
-- from employee emp
-- left join selection_details selection on selection.ps_id=emp.psid
-- left join lob lob on selection.lob_id=lob.lob_id
-- left join tagging_details td on emp.psid=td.ps_id
-- left join onboarding_status obs on td.onboarding_status_id=obs.status_id
-- left join BGVStatus bgvs on td.bgv_status_id=bgvs.bgv_status_id
-- where selection.created_by = 10713037
-- Union	  
-- Select cnd.phone_number as id,cnd.first_name,cnd.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status 
-- from candidate cnd
-- left join selection_details selection on selection.vendor_phone_number=cnd.phone_number
-- left join lob lob on selection.lob_id=lob.lob_id
-- left join tagging_details td on cnd.phone_number=td.vendor_phone_number
-- left join onboarding_status obs on td.onboarding_status_id=obs.status_id
-- left join BGVStatus bgvs on td.bgv_status_id=bgvs.bgv_status_id
-- where selection.created_by = 10713037
-- Union
-- Select vc.vendor_id as id,vc.first_name,vc.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status   
-- from vendor_candidate vc
-- left join selection_details selection on selection.vendor_phone_number=vc.phone_number
-- left join lob lob on selection.lob_id=lob.lob_id
-- left join tagging_details td on vc.phone_number=td.vendor_phone_number
-- left join onboarding_status obs on td.onboarding_status_id=obs.status_id
-- left join BGVStatus bgvs on td.bgv_status_id=bgvs.bgv_status_id
-- where selection.created_by = 10713037;


select count(*),lb.lob_name,sd.pricing_model from selectiontracker.selection_details sd,selectiontracker.lob lb 
where sd.lob_id=lb.lob_id  
group by lb.lob_id,sd.pricing_model;

select count(*),lb.lob_name,os.onboarding_status,bs.bgv_status 
from selection_details sd , lob lb, tagging_details td, onboarding_status os, BGVStatus bs
where sd.ps_id = td.ps_id
and sd.lob_id=lb.lob_id
and td.onboarding_status_id = os.status_id
and td.bgv_status_id = bs.bgv_status_id
group by lb.lob_id,os.status_id,bs.bgv_status_id;

SELECT count(*) as awaited_count,lb.delivery_manager,sd.pricing_model,bs.bgv_status,os.onboarding_status 
from selection_details sd,tagging_details td,BGVStatus bs,onboarding_status os,lob lb 
where sd.ps_id = td.ps_id 
and sd.lob_id=lb.lob_id
and td.bgv_status_id = bs.bgv_status_id 
and td.onboarding_status_id = os.status_id 
group by bs.bgv_status_id,sd.pricing_model,lb.delivery_manager,os.status_id;

-- Select obs.onboarding_status as onboardingStatus, emp.psid as lti_ps_id,emp.first_name as firstName,emp.last_name as lastName,emp.grade as grade,emp.location as location,emp.total_experience as totalExperience,emp.skill as skill,
-- selection.hsbcselection_date as hsbcselectionDate,selection.ltionboarding_date as ltijoiningDate,selection.create_date as createdDate,DATE_FORMAT(hsbcselection_date, '%Y-%m') as selectionMonthYear,datediff(now(),hsbcselection_date) as selectionAging,
-- 'Internal' as category, emp.pu as basebu, lob.lob_name,sublob.sub_lob_name,selection.salespoc as salesPoc, selection.hsbchiring_manager as hsbchiringManager,selection.hsbchead as hsbcHead, selection.delivery_manager as deliveryManager, 
-- selection.irm as IRM, selection.pricing_model as pricingModel, selection.hsbctool_id as hsbcctoolId, selection.ctool_received_date as ctoolRecievedDate,
-- CASE WHEN hsbctool_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS CtoolRecievedStatus,
-- datediff(now(),selection.ctool_received_date) as ctoolAging,  CASE WHEN DATEDIFF(NOW(), selection.ctool_received_date) >= 0 THEN FLOOR(DATEDIFF(NOW(), selection.ctool_received_date) / 7) ELSE 0 END AS ctoolAgingWeekBucket, selection.ctool_start_date as ctoolStartDate, selection.recruiter_name as recruiterName,selection.ctool_rate as ctoolRate,
-- selection.ctool_proposed_rate as proposedRate, roles.role_title as hsbcRole,roles.grade, bgvs.bgv_status as finalBGVStatus, 
-- CASE WHEN selection.tech_selection_date IS NOT NULL THEN 'Done' ELSE 'Pending' END as techSelectionStatus, 
-- td.status_remarks as remarks,CASE WHEN  IS NOT NULL THEN '' ELSE 'Location Mismatch' END AS interviewDocuments, selection.dojreceived_date as hsbcConfirmedDoj, datediff(selection.dojreceived_date, selection.hsbcselection_date) as agingSelectionWithDoj, 
-- floor(datediff(selection.dojreceived_date, selection.hsbcselection_date)/7) as hsbcDojAgingBucket, selection.hsbconboarding_date as hsbcOnboardingDate, td.create_date as taggingDone, selection.tech_selection_date as techSelectionDone
-- from employee emp
-- left join selection_details selection on selection.ps_id=emp.psid
-- left join lob lob on selection.lob_id=lob.lob_id
-- left join sublob sublob on selection.sub_lob_id = sublob.sublobid
-- left join hsbc_roles roles on selection.hsbc_role_id = roles.ref
-- left join tagging_details td on emp.psid=td.ps_id
-- left join onboarding_status obs on td.onboarding_status_id=obs.status_id
-- left join bgvstatus bgvs on td.bgv_status_id=bgvs.bgv_status_id
-- where selection.created_by = 10713037
-- UNION
-- Select obs.onboarding_status as onboardingStatus, "External" as lti_ps_id,cnd.first_name as firstName,cnd.last_name as lastName,'' as grade,'' as location,'' as totalExperience,'' as skill,
-- selection.hsbcselection_date as hsbcselectionDate,selection.ltionboarding_date as ltijoiningDate,selection.create_date as createdDate,DATE_FORMAT(hsbcselection_date, '%Y-%m') as selectionMonthYear,datediff(now(),hsbcselection_date) as selectionAging,
-- 'External' as category,'BB' as basebu, lob.lob_name,sublob.sub_lob_name,selection.salespoc as salesPoc, selection.hsbchiring_manager as hsbchiringManager,selection.hsbchead as hsbcHead, selection.delivery_manager as deliveryManager, 
-- selection.irm as IRM, selection.pricing_model as pricingModel, selection.hsbctool_id as hsbcctoolId, selection.ctool_received_date as ctoolRecievedDate,
-- CASE WHEN hsbctool_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS CtoolRecievedStatus,
-- datediff(now(),selection.ctool_received_date) as ctoolAging, floor(datediff(now(),selection.ctool_received_date)/7) as ctoolAgingWeekBucket, selection.ctool_start_date as ctoolStartDate, selection.recruiter_name as recruiterName,selection.ctool_rate as ctoolRate,
-- selection.ctool_proposed_rate as proposedRate, roles.role_title as hsbcRole,roles.grade, bgvs.bgv_status as finalBGVStatus, 
-- CASE WHEN selection.tech_selection_date IS NOT NULL THEN 'Done' ELSE 'Pending' END as techSelectionStatus, 
-- td.status_remarks as remarks,CASE WHEN selection.interview_evidences IS NOT NULL THEN '' ELSE 'Location Mismatch' END AS interviewDocuments, selection.dojreceived_date as hsbcConfirmedDoj, datediff(selection.dojreceived_date, selection.hsbcselection_date) as agingSelectionWithDoj, 
-- floor(datediff(selection.dojreceived_date, selection.hsbcselection_date)/7) as hsbcDojAgingBucket, selection.hsbconboarding_date as hsbcOnboardingDate, td.create_date as taggingDone, selection.tech_selection_date as techSelectionDone
-- from candidate cnd
-- left join selection_details selection on selection.candidate_id=cnd.candidate_id
-- left join lob lob on selection.lob_id=lob.lob_id
-- left join sublob sublob on selection.sub_lob_id = sublob.sublobid
-- left join hsbc_roles roles on selection.hsbc_role_id = roles.ref
-- left join tagging_details td on cnd.candidate_id=td.candidate_id
-- left join onboarding_status obs on td.onboarding_status_id=obs.status_id
-- left join bgvstatus bgvs on td.bgv_status_id=bgvs.bgv_status_id
-- where selection.created_by = 10713037
-- UNION
-- Select obs.onboarding_status as onboardingStatus, v.vendor_name as lti_ps_id,vd.first_name as firstName,vd.last_name as lastName,'' as grade,'' as location,'' as totalExperience,'' as skill,
-- selection.hsbcselection_date as hsbcselectionDate,selection.ltionboarding_date as ltijoiningDate,selection.create_date as createdDate,DATE_FORMAT(hsbcselection_date, '%Y-%m') as selectionMonthYear,datediff(now(),hsbcselection_date) as selectionAging,
-- v.vendor_name as category,'BB' as basebu, lob.lob_name,sublob.sub_lob_name,selection.salespoc as salesPoc, selection.hsbchiring_manager as hsbchiringManager,selection.hsbchead as hsbcHead, selection.delivery_manager as deliveryManager, 
-- selection.irm as IRM, selection.pricing_model as pricingModel, selection.hsbctool_id as hsbcctoolId, selection.ctool_received_date as ctoolRecievedDate,
-- CASE WHEN hsbctool_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS CtoolRecievedStatus,
-- datediff(now(),selection.ctool_received_date) as ctoolAging, floor(datediff(now(),selection.ctool_received_date)/7) as ctoolAgingWeekBucket, selection.ctool_start_date as ctoolStartDate, selection.recruiter_name as recruiterName,selection.ctool_rate as ctoolRate,
-- selection.ctool_proposed_rate as proposedRate, roles.role_title as hsbcRole,roles.grade, bgvs.bgv_status as finalBGVStatus, 
-- CASE WHEN selection.tech_selection_date IS NOT NULL THEN 'Done' ELSE 'Pending' END as techSelectionStatus, 
-- td.status_remarks as remarks,CASE WHEN selection.interview_evidences IS NOT NULL THEN '' ELSE 'Location Mismatch' END AS interviewDocuments, selection.dojreceived_date as hsbcConfirmedDoj, datediff(selection.dojreceived_date, selection.hsbcselection_date) as agingSelectionWithDoj, 
-- floor(datediff(selection.dojreceived_date, selection.hsbcselection_date)/7) as hsbcDojAgingBucket, selection.hsbconboarding_date as hsbcOnboardingDate, td.create_date as taggingDone, selection.tech_selection_date as techSelectionDone
-- from vendor_candidate vd
-- left join selection_details selection on selection.vendor_candidate_id=vd.vendor_candidate_id
-- left join vendor v on vd.vendor_id = v.vendor_id
-- left join lob lob on selection.lob_id=lob.lob_id
-- left join sublob sublob on selection.sub_lob_id = sublob.sublobid
-- left join hsbc_roles roles on selection.hsbc_role_id = roles.ref
-- left join tagging_details td on vd.vendor_candidate_id=td.vendor_candidate_id
-- left join onboarding_status obs on td.onboarding_status_id=obs.status_id
-- left join bgvstatus bgvs on td.bgv_status_id=bgvs.bgv_status_id
-- where selection.created_by = 10713037;