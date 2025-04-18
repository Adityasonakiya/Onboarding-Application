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
(1,1082980311, 1,'Harshita', NULL, 'Tripathi', '2024-09-23', 10713037, 10713037, '2024-09-23', NOW()),
(2,1082058123,1, 'Komal', 'Vitthal', 'More', '2024-09-23', NULL, NULL, '2024-09-23', NOW()),
(3,1083000611,1, 'Ankit', NULL, 'Jain', '2024-10-01', 10713037, 10713037, '2024-10-01', NOW()),
(4,1083000721,1, 'Sneha', NULL, 'Reddy', '2024-10-05', 10713037, 10713037, '2024-10-05', NOW()),
(5,1083000821,1, 'Rahul', NULL, 'Mehta', '2024-10-10', 10713037, 10713037, '2024-10-10', NOW()),
(6,1083000911,1, 'Kiran', NULL, 'Patil', '2024-10-15', 10713037, 10713037, '2024-10-15', NOW()),
(7,1083001023,1, 'Megha', NULL, 'Sharma', '2024-10-20', 10713037, 10713037, '2024-10-20', NOW()),
(8,1083001121,1, 'Suresh', NULL, 'Kumar', '2024-10-25', 10713037, 10713037, '2024-10-25', NOW()),
(9,1083001223,1, 'Anjali', NULL, 'Verma', '2024-10-30', 10713037, 10713037, '2024-10-30', NOW()),
(10,1083001322,1, 'Vivek', NULL, 'Singh', '2024-11-05', 10713037, 10713037, '2024-11-05', NOW());

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


-- INSERT INTO vendor_candidate (vendor_candidate_id,phone_number,vendor_id , first_name, middle_name, last_name, ltionboarding_date, created_by_ps_id, updated_by_ps_id, create_date, update_date)
-- VALUES
-- (1,2321322222, 1, 'John', 'A.', 'Doe', '2025-01-15', 10713037, 10713037, '2025-01-01', '2025-01-10'),
-- (2,8887877788, 2, 'Jane', 'B.', 'Smith', '2025-01-20', 10713037, 10713037, '2025-01-02', '2025-01-11'),
-- (3,8787788898, 3, 'Michael', 'C.', 'Johnson', '2025-01-25', 10713037, 10713037, '2025-01-03', '2025-01-12'),
-- (4,8979888778, 4, 'Emily', 'D.', 'Williams', '2025-02-01', 10713037, 10713037, '2025-01-04', '2025-01-13'),
-- (5,8799989887, 5, 'David', 'E.', 'Brown', '2025-02-05', 10713037, 10713037, '2025-01-05', '2025-01-14'),
-- (6,8979786678, 6, 'Sarah', 'F.', 'Jones', '2025-02-10', 10713037, 10713037, '2025-01-06', '2025-01-15'),
-- (7,7879978898, 7, 'Daniel', 'G.', 'Garcia', '2025-02-15', 10713037, 10713037, '2025-01-07', '2025-01-16'),
-- (8,8977897998, 8, 'Sophia', 'H.', 'Martinez', '2025-02-20', 10713037, 10713037, '2025-01-08', '2025-01-17'),
-- (9,8899978997, 9, 'James', 'I.', 'Hernandez', '2025-02-25', 10713037, 10713037, '2025-01-09', '2025-01-18'),
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

INSERT INTO BGVStatus
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
(4,"Joined date delayed"," candidate joined date delayed");

INSERT INTO lob (lob_id, lob_name, remarks, created_by, updated_by, created_date, update_date) VALUES
(1, 'Business & Data Architecture', 'Business & Data Architecture', 10713037, 10713037, NOW(), NOW()),
(2, 'CTO', 'Chief Technology Officer', 10713037, 10713037, NOW(), NOW()),
(3, 'Cybersecurity', 'Cybersecurity Assessment and testing', 10713037, 10713037, NOW(), NOW()),
(4, 'Enterprise Technology', 'Finance & banking', 10713037, 10713037, NOW(), NOW()),
(5, 'Global Ops & Automation Tech', 'Automation Technology', 10713037, 10713037, NOW(), NOW()),
(6, 'Group Data Technology', 'Group data Technology', 10713037, 10713037, NOW(), NOW()),
(7, 'HDPI', 'Pixel density', 10713037, 10713037, NOW(), NOW()),
(8, 'INM', 'INM', 10713037, 10713037, NOW(), NOW()),
(9, 'Markets & Sec Services Tech', 'Services', 10713037, 10713037, NOW(), NOW()),
(10, 'MDS & DAO ESG', 'Data& Analytics', 10713037, 10713037, NOW(), NOW()),
(11, 'Regional CIO - Europe', 'Regional CIO for Europe', 10713037, 10713037, NOW(), NOW()),
(12, 'SAB Technology', 'SAB Tech', 10713037, 10713037, NOW(), NOW()),
(13, 'Strategic Services Technology', 'SST Group', 10713037, 10713037, NOW(), NOW()),
(14, 'Technology COO', 'Tech COO', 10713037, 10713037, NOW(), NOW()),
(15, 'Wholesale Technology', 'WS Tech', 10713037, 10713037, NOW(), NOW()),
(16, 'WPB Technology', 'WPB', 10713037, 10713037, NOW(), NOW());

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
(115,15,'WS Global Payment Solutions',10713037,10713037,NOW(),NOW()),
(215,15,'WS Tech Client Services',10713037,10713037,NOW(),NOW()),
(315,15,'WS Tech Credit & Lending',10713037,10713037,NOW(),NOW()),
(415,15,'WS Tech Digital',10713037,10713037,NOW(),NOW()),
(515,15,'WS Tech FEM&S',10713037,10713037,NOW(),NOW()),
(615,15,'WS Tech General',10713037,10713037,NOW(),NOW()),
(715,15,'WS Tech Global Banking',10713037,10713037,NOW(),NOW()),
(815,15,'WS Tech Global Trade and RF',10713037,10713037,NOW(),NOW()),
(915,15,'WS Tech Regional',10713037,10713037,NOW(),NOW()),
(1015,15,'WS Tech Shared Services',10713037,10713037,NOW(),NOW()),
(1115,15,'WSIT General',10713037,10713037,NOW(),NOW()),
(116,16,'Enabler Platforms',10713037,10713037,NOW(),NOW()),
(216,16,'GPBW and AMG Tech',10713037,10713037,NOW(),NOW()),
(316,16,'Insurance',10713037,10713037,NOW(),NOW()),
(416,16,'Retail Banking Technology',10713037,10713037,NOW(),NOW()),
(516,16,'WPB Technology Management',10713037,10713037,NOW(),NOW()),
(616,16,'WPB UK Tech',10713037,10713037,NOW(),NOW());


INSERT INTO selection_details 
(ps_id, candidate_id,vendor_candidate_id, delivery_manager, lob_id, sub_lob_id, irm, created_by, updated_by, hsbcselection_date, 
hsbchiring_manager, hsbchead, salespoc, pricing_model, hsbctool_id, ctool_received_date, ctool_job_category, 
ctool_location, ctool_rate, ctool_proposed_rate, recruiter_name, interview_evidences, offer_release_status, 
hsbconboarding_date, tech_selection_date, dojreceived_date, ltionboarding_date, create_date, update_date,candidate_status_date) 
VALUES
(10820984, NULL,NULL, 'Sachin Shaha', 1, 11, 10825932, 10713037, 10713037, '2023-03-05', 
'Sachin Shaha', 'Sachin Shaha', 'Anand Devi', 'T&M', 108933, '2023-12-02', 'TM', 
'Pune', 30, 30, 'Nishant Sharma', NULL, 'Pending', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10715126, NULL,NULL, 'Abhijeet Sureshchandra More', 2, 22, 10825932, 10713037, 10713037, '2025-03-12', 
'Sachin Shaha', 'Sachin Shaha', 'Nishant Sharma', 'FP', 108933, '2025-12-02', 'TM', 
'Pune', 30, 30, 'Nishant Sharma', NULL, 'On Hold', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10825932, NULL,NULL, 'Aniruddha Deshpande', 6, 36, 10825932, 10713037, 10713037, '2025-03-18', 
'Sachin Shaha', 'Sachin Shaha', 'Indranil Moolay', 'T&M', 108933, '2025-12-02', 'TM', 
'Pune', 30, 30, 'Nishant Sharma', NULL, 'Release', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(NULL, 1,NULL, 'Arvind Deogade', 1, 11, 10825932, 10713037, 10713037, '2025-03-17', 
'Sachin Shaha', 'Sachin Shaha', 'Ajay Pillai', 'FP', 108933, '2025-12-02', 'TM', 
'Pune', 30, 30, 'Nishant Sharma', NULL, 'WIP', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10830001, NULL,NULL, 'Chinni Krishna Nakka', 4, 44, 10825932, 10713037, 10713037, '2025-03-08', 
'Sachin Shaha', 'Sachin Shaha', 'Anand Devi', 'FP', 108934, '2025-12-02', 'TM', 
'Mumbai', 40, 40, 'Nishant Sharma', NULL, 'Pending', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10830002, NULL,NULL, 'Mayuresh Nirantar', 4, 54, 10825932, 10713037, 10713037, '2025-03-15', 
'Sachin Shaha', 'Sachin Shaha', 'Nishant Sharma', 'T&M', 108935, '2025-12-02', 'TM', 
'Bangalore', 50, 50, 'Nishant Sharma', NULL, 'On Hold', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10830003, NULL,NULL, 'Saber Sarode', 6, 66, 10825932, 10713037, 10713037, '2025-03-10', 
'Sachin Shaha', 'Sachin Shaha', 'Indranil Moolay', 'FP', 108936, '2025-12-02', 'TM', 
'Hyderabad', 60, 60, 'Nishant Sharma', NULL, 'Release', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
( 10830006,NULL,NULL, 'Sachin Shaha', 1, 11, 10825932, 10713037, 10713037, '2025-03-25', 
'Sachin Shaha', 'Sachin Shaha', 'Ajay Pillai', 'T&M', 108933, '2025-12-02', 'TM', 
'Pune', 30, 30, 'Nishant Sharma', NULL, 'WIP', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10830004, NULL,NULL, 'Abhijeet Sureshchandra More', 6, 76, 10825932, 10713037, 10713037, '2025-03-14', 
'Sachin Shaha', 'Sachin Shaha', 'Anand Devi', 'FP', 108937, '2025-12-02', 'TM', 
'Chennai', 70, 70, 'Nishant Sharma', NULL, 'Pending', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10830005, NULL,NULL, 'Aniruddha Deshpande', 6, 86, 10825932, 10713037, 10713037, '2025-03-19', 
'Sachin Shaha', 'Sachin Shaha', 'Nishant Sharma', 'FP', 108938, '2025-12-02', 'TM', 
'Delhi', 80, 80, 'Nishant Sharma', NULL, 'On Hold', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10830007, NULL,NULL, 'Mayuresh Nirantar', 9, 19, 10825932, 10713037, 10713037, '2025-03-11', 
'Sachin Shaha', 'Sachin Shaha', 'Nishant Sharma', 'T&M', 108939, '2025-12-02', 'TM', 
'Bangalore', 90, 90, 'Nishant Sharma', NULL, 'Release', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10830008, NULL,NULL, 'Saber Sarode', 10, 110, 10825932, 10713037, 10713037, '2025-03-20', 
'Sachin Shaha', 'Sachin Shaha', 'Indranil Moolay', 'FP', 108940, '2025-12-02', 'TM', 
'Hyderabad', 100, 100, 'Nishant Sharma', NULL, 'WIP', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(NULL, 6,NULL, 'Sachin Shaha', 11, 111, 10825932, 10713037, 10713037, '2025-03-13', 
'Sachin Shaha', 'Sachin Shaha', 'Ajay Pillai', 'T&M', 108941, '2025-12-02', 'TM', 
'Pune', 110, 110, 'Nishant Sharma', NULL, 'Pending', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10830010, NULL,NULL, 'Abhijeet Sureshchandra More', 12, 112, 10825932, 10713037, 10713037, '2025-03-17', 
'Sachin Shaha', 'Sachin Shaha', 'Anand Devi', 'FP', 108942, '2025-12-02', 'TM', 
'Chennai', 120, 120, 'Nishant Sharma', NULL, 'On Hold', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10830011, NULL,NULL, 'Aniruddha Deshpande', 13, 113, 10825932, 10713037, 10713037, '2025-03-09', 
'Sachin Shaha', 'Sachin Shaha', 'Nishant Sharma', 'FP', 108943, '2025-12-02', 'TM', 
'Delhi', 130, 130, 'Nishant Sharma', NULL, 'Release', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
-- (10830012, NULL, 'Mayuresh Nirantar', 14, 114, 10825932, 10713037, 10713037, '2025-03-21', 
-- 'Sachin Shaha', 'Sachin Shaha', 'Nishant Sharma', 'T&M', 108944, '2025-12-02', 'TM', 
-- 'Bangalore', 140, 140, 'Nishant Sharma', NULL, 'WIP', 
-- '2024-12-23', NULL, NULL, NULL, NOW(), NOW()),
(10830013, NULL,NULL, 'Saber Sarode', 15, 115, 10825932, 10713037, 10713037, '2025-03-18', 
'Sachin Shaha', 'Sachin Shaha', 'Indranil Moolay', 'FP', 108945, '2025-12-02', 'TM', 
'Hyderabad', 150, 150, 'Nishant Sharma', NULL, 'Pending', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(NULL, 7,NULL, 'Sachin Shaha', 16, 116, 10825932, 10713037, 10713037, '2025-03-16', 
'Sachin Shaha', 'Sachin Shaha', 'Ajay Pillai', 'T&M', 108946, '2025-12-02', 'TM', 
'Pune', 160, 160, 'Nishant Sharma', NULL, 'WIP', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10830014, NULL,NULL, 'Abhijeet Sureshchandra More', 16, 316, 10825932, 10713037, 10713037, '2025-02-28', 
'Sachin Shaha', 'Sachin Shaha', 'Anand Devi', 'FP', 108947, '2025-12-02', 'TM', 
'Chennai', 170, 170, 'Nishant Sharma', NULL, 'Pending', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(10830015, NULL,NULL, 'Aniruddha Deshpande', 15, 715, 10825932, 10713037, 10713037, '2025-02-15', 
'Sachin Shaha', 'Sachin Shaha', 'Nishant Sharma', 'FP', 108948, '2025-12-02', 'TM', 
'Delhi', 180, 180, 'Nishant Sharma', NULL, 'On Hold', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL),
(NULL, 8,NULL, 'Mayuresh Nirantar', 8, 18, 10825932, 10713037, 10713037, '2025-01-30', 
'Sachin Shaha', 'Sachin Shaha', 'Nishant Sharma', 'T&M', 108949, '2025-12-02', 'TM', 
'Bangalore', 190, 190, 'Nishant Sharma', NULL, 'Release', 
'2024-12-23', NULL, NULL, NULL, NOW(), NOW(),NULL);
-- (10830012, NULL, 'Saber Sarode', 9, 79, 10825932, 10713037, 10713037, '2025-01-20', 
-- 'Sachin Shaha', 'Sachin Shaha', 'Indranil Moolay', 'FP', 108950, '2025-12-02', 'TM', 
-- 'Hyderabad', 200, 200, 'Nishant Sharma', NULL, 'WIP', 
-- '2024-12-23', NULL, NULL, NULL, NOW(), NOW());


INSERT INTO tagging_details 
(ps_id,candidate_id, onboarding_status_id, bgvstatus_id, created_by_psid, updated_by_psid, status_remarks, create_date, update_date) 
VALUES
(10820984, NULL, 1, 2, 10713037, 10713037, 'Initial tagging', NOW(), '2025-03-03'),
(NULL, 1, 2, 3, 10713037, 10713037, 'BGV in progress', NOW(), '2025-03-06'),
(10821014, NULL, 3, 2, 10713037, 10713037, 'Minor discrepancy found', NOW(), '2025-03-18'),
(10715126, NULL, 4, 4, 10713037, 10713037, 'Major discrepancy found', NOW(), '2025-03-19'),
(10825932, NULL, 5, 6, 10713037, 10713037, 'Offer yet to be released', NOW(), '2025-03-11'),
(10830001, NULL, 6, 6, 10713037, 10713037, 'Interim cleared', NOW(), '2025-03-15'),
(10830002, NULL, 7, 3, 10713037, 10713037, 'Pending with employee', NOW(), '2025-03-12'),
(10830003, NULL, 8, 5, 10713037, 10713037, 'BGV initiated', NOW(), '2025-03-17'),
( 10830006,NULL, 9, 2, 10713037, 10713037, 'BGV in progress', NOW(), '2025-03-05'),
(10830004, NULL, 10, 7, 10713037, 10713037, 'Minor discrepancy found', NOW(), '2025-03-14'),
(10830005, NULL, 1, 2, 10713037, 10713037, 'Initial tagging', NOW(), '2025-03-11'),
( 10830007,NULL, 2, 3, 10713037, 10713037, 'BGV in progress', NOW(), '2025-03-05'),
(10830008, NULL, 3, 2, 10713037, 10713037, 'Minor discrepancy found', NOW(), '2025-03-17'),
(10830009, NULL, 4, 4, 10713037, 10713037, 'Major discrepancy found', NOW(), '2025-02-28'),
(10830010, NULL, 5, 6, 10713037, 10713037, 'Offer yet to be released', NOW(), '2025-01-01'),
(10830011, NULL, 6, 6, 10713037, 10713037, 'Interim cleared', NOW(), '2025-01-22'),
-- (10830012, NULL, 7, 3, 10713037, 10713037, 'Pending with employee', NOW(), '2025-01-05'),
(10830013, NULL, 8, 5, 10713037, 10713037, 'BGV initiated', NOW(), '2025-02-11'),
(10830014, NULL, 10, 7, 10713037, 10713037, 'Minor discrepancy found', NOW(), '2025-02-02');



Select emp.psid as id ,emp.first_name,emp.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status from employee emp,lob lob,
selection_details selection,onboarding_status obs,BGVStatus bgvs , tagging_details td
where selection.created_by = 10713037
      and selection.ps_id=emp.psid
	  and selection.lob_id=lob.lob_id	  
	  and emp.psid=td.ps_id
	  and td.onboarding_status_id=obs.status_id
	  and td.bgvstatus_id=bgvs.bgv_status_id
Union	  
Select cnd.vendor_id as id,cnd.first_name,cnd.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status from candidate cnd,lob lob,
selection_details selection,onboarding_status obs,BGVStatus bgvs , tagging_details td
where selection.created_by = 10713037
      and selection.candidate_id=cnd.candidate_id
      and selection.lob_id=lob.lob_id
	  and cnd.candidate_id=td.candidate_id
	  and td.onboarding_status_id=obs.status_id
	  and td.bgvstatus_id=bgvs.bgv_status_id
Union
Select vc.vendor_id as id,vc.first_name,vc.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status from vendor_candidate vc,lob lob,
selection_details selection,onboarding_status obs,BGVStatus bgvs , tagging_details td
where selection.created_by = 10713037
      and selection.vendor_candidate_id=vc.vendor_candidate_id
      and selection.lob_id=lob.lob_id
	  and vc.vendor_candidate_id=td.vendor_candidate_id
	  and td.onboarding_status_id=obs.status_id
	  and td.bgvstatus_id=bgvs.bgv_status_id;

-- Select emp.psid as id ,emp.first_name,emp.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status 
-- from employee emp
-- left join selection_details selection on selection.ps_id=emp.psid
-- left join lob lob on selection.lob_id=lob.lob_id
-- left join tagging_details td on emp.psid=td.ps_id
-- left join onboarding_status obs on td.onboarding_status_id=obs.status_id
-- left join BGVStatus bgvs on td.bgvstatus_id=bgvs.bgv_status_id
-- where selection.created_by = 10713037
-- Union	  
-- Select cnd.phone_number as id,cnd.first_name,cnd.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status 
-- from candidate cnd
-- left join selection_details selection on selection.vendor_phone_number=cnd.phone_number
-- left join lob lob on selection.lob_id=lob.lob_id
-- left join tagging_details td on cnd.phone_number=td.vendor_phone_number
-- left join onboarding_status obs on td.onboarding_status_id=obs.status_id
-- left join BGVStatus bgvs on td.bgvstatus_id=bgvs.bgv_status_id
-- where selection.created_by = 10713037
-- Union
-- Select vc.vendor_id as id,vc.first_name,vc.last_name,lob.lob_name,selection.hsbchiring_manager,obs.onboarding_status,bgvs.bgv_status   
-- from vendor_candidate vc
-- left join selection_details selection on selection.vendor_phone_number=vc.phone_number
-- left join lob lob on selection.lob_id=lob.lob_id
-- left join tagging_details td on vc.phone_number=td.vendor_phone_number
-- left join onboarding_status obs on td.onboarding_status_id=obs.status_id
-- left join BGVStatus bgvs on td.bgvstatus_id=bgvs.bgv_status_id
-- where selection.created_by = 10713037;


select count(*),lb.lob_name,sd.pricing_model from selectiontracker.selection_details sd,selectiontracker.lob lb 
where sd.lob_id=lb.lob_id  
group by lb.lob_id,sd.pricing_model;

select count(*),lb.lob_name,os.onboarding_status,bs.bgv_status 
from selection_details sd , lob lb, tagging_details td, onboarding_status os, BGVStatus bs
where sd.ps_id = td.ps_id
and sd.lob_id=lb.lob_id
and td.onboarding_status_id = os.status_id
and td.bgvstatus_id = bs.bgv_status_id
group by lb.lob_id,os.status_id,bs.bgv_status_id;

SELECT count(*) as awaited_count,sd.delivery_manager,sd.pricing_model,bs.bgv_status,os.onboarding_status 
from selection_details sd,tagging_details td,BGVStatus bs,onboarding_status os 
where sd.ps_id = td.ps_id 
and td.bgvstatus_id = bs.bgv_status_id 
and td.onboarding_status_id = os.status_id 
group by bs.bgv_status_id,sd.pricing_model,sd.delivery_manager,os.status_id;
