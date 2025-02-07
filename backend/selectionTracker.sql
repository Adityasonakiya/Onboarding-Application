use selectionTracker;

INSERT INTO roles 
(roleid, role_name, role_functions, remarks) 
VALUES
(1, 'Admin', 'Admin rights for the application', NULL),
(2, 'Staff-PMO', 'PMO', 'PMO'),
(3, 'Staff-HR', 'HR', 'HR'),
(4, 'Staff-Other', 'Any other employee', 'Do specify');

INSERT INTO user (psid, role_id, user_manager_id, password, last_login, last_logout) VALUES
(10820934, 1, 10820934, 'Harshi@12', NOW(), NOW()),
(10820984, 1, 10713037, 'Adity@12', NOW(), NOW());

INSERT INTO employee 
(psid, first_name, middle_name, last_name, grade, location, skill, total_experience, pu, mailid) 
VALUES
(10820984, 'Aditya', NULL, 'Sonakiya', 'P1', 'Pune', 'Software Engineer', 0.4, 'BB', 'aditya.sonakiya@ltimindtree.com'),
(108210014, 'Abhijeet', NULL, 'Verma', 'P1', 'Pune', 'Software Engineer', 0.4, 'BB', 'abhijeet.verma@ltimindtree.com'),
(10715126, 'Monali', NULL, 'Jangam', 'P4', 'Pune', 'Java Fullstack', 1, 'BB', 'monali.jangam@ltimindtree.com'),
(10825932, 'Bhakti', 'Anand', 'Kulkarni', 'M4', 'Pune', 'Scrum Mamagement', 1, 'BB', 'bhakti.kulkarni@ltimindtree.com');

INSERT INTO candidate
(candidate_id, first_name, middle_name, last_name, ltionboarding_date, created_by, updated_by, create_date, update_date) 
VALUES
(10829803, 'Harshita', NULL, 'Tripathi', '2024-09-23', NULL, NULL, '2024-09-23', NULL),
(10820581, 'Komal', 'Vitthal', 'More', '2024-09-23', NULL, NULL, '2024-09-23', NULL);

INSERT INTO onboarding_status 
(status_id, onboarding_status, remarks) 
VALUES
(1, 'CTool Pending', 'The onboarding process has not yet started.'),
(2, 'CTool Recieved', 'Recieved'),
(3, 'Tagging Completed', 'Successfully tagged'),
(4, 'DOJ Recieved', 'DOJ has been recieved by the candidate'),
(5, 'Onboarding', 'Onboarding process going on'),
(6, 'Completed', 'The onboarding process is successfully completed.'),
(7, 'Tagging Error', 'Issue during onboarding process'),
(8, 'Rate Approval', 'Rate has been approved'),
(9, 'Pending', 'Onboarding process is pending'),
(10, 'Rate to be Changed', 'In case the rate needs to be changed');

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

INSERT INTO lob (lob_id, lob_name, remarks, created_by, updated_by, created_date, update_date) VALUES
(1, 'Business & Data Architecture', 'Business & Data Architecture', NULL, NULL, NULL, NULL),
(2, 'CTO', 'Chief Technology Officer', NULL, NULL, NULL, NULL),
(3, 'Cybersecurity', 'Cybersecurity Assessment and testing', NULL, NULL, NULL, NULL),
(4, 'Enterprise Technology', 'Finance & banking', NULL, NULL, NULL, NULL),
(5, 'Global Ops & Automation Tech', 'Automation Technology', NULL, NULL, NULL, NULL),
(6, 'Group Data Technology', 'Group data Technology', NULL, NULL, NULL, NULL),
(7, 'HDPI', 'Pixel density', NULL, NULL, NULL, NULL),
(8, 'INM', 'INM', NULL, NULL, NULL, NULL),
(9, 'Markets & Sec Services Tech', 'Services', NULL, NULL, NULL, NULL),
(10, 'MDS & DAO ESG', 'Data& Analytics', NULL, NULL, NULL, NULL),
(11, 'Regional CIO - Europe', 'Regional CIO for Europe', NULL, NULL, NULL, NULL),
(12, 'SAB Technology', 'SAB Tech', NULL, NULL, NULL, NULL),
(13, 'Strategic Services Technology', 'SST Group', NULL, NULL, NULL, NULL),
(14, 'Technology COO', 'Tech COO', NULL, NULL, NULL, NULL),
(15, 'Wholesale Technology', 'WS Tech', NULL, NULL, NULL, NULL),
(16, 'WPB Technology', 'WPB', NULL, NULL, NULL, NULL);

INSERT INTO sublob 
(sublobid, lob_id, sub_lob_name, created_by, update_by, create_date, update_date) 
VALUES
(1, 1, 'Architecture Stds & Gov', NULL, NULL, NULL, NULL),
(2, 3, 'Cyber Assessment & Testing', NULL, NULL, NULL, NULL),
(3, 7, 'HDPI', NULL, NULL, NULL, NULL),
(4, 8, 'INM', NULL, NULL, NULL, NULL);


INSERT INTO selection_details 
(ps_id, candidate_id, delivery_manager, lob_id, sub_lob_id, irm, created_by, updated_by, hsbcselecion_date, 
hsbchiring_manager, hsbchead, salespoc, pricing_model, hsbctool_id, ctool_received_date, ctool_job_category, 
ctool_location, ctool_rate, ctool_proposed_rate, recruiter_name, interview_evidences, offer_release_status, 
hsbconboarding_date, tech_selection_date, dojreceived_date, ltionboarding_date, create_date, update_date) 
VALUES
(10820984, NULL, 'Sachin Shaha', 2, 1, NULL, NULL, NULL, '2024-12-18', 
NULL, NULL, 'Anand Devi', 'T&M', 10893, NULL, NULL, 
'Pune', 3, 3, NULL, NULL, 'WIP', 
'2024-12-23', NULL, '2024-12-18', '2024-09-23',NULL ,NULL),
(NULL, 10829803, 'Anirudha Deshpande', 6, 1, NULL, NULL, NULL, '2024-12-18',
NULL, NULL,"Nishant Sharma" , 'FP', 108293, NULL, NULL,
'Pune', 3, 2, NULL, NULL, 'On Hold', 
'2024-12-23', NULL, '2024-12-18', '2024-09-23',NULL ,NULL);

INSERT INTO tagging_details 
(ps_id, candidate_id, onboarding_status_id, bgvstatus_id, created_by_psid, updated_by_psid, status_remarks, create_date, update_date) 
VALUES
(10820984, NULL, 2, 3, NULL, NULL, NULL, NULL, NULL),
(NULL, 10829803, 1, 5, NULL, NULL, NULL, NULL, NULL);