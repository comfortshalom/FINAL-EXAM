-- Select the UNI-FIND database.
USE uni_find;

-- Insert a fictional Student account.
INSERT INTO users (full_name, email, student_number, password, role)
SELECT
    'Demo Student One',
    'demo.student1@ucu.ac.ug',
    'UCUDEMO001',
    '$2b$12$H.SUQFcSTcAoJ6T6Hu.nV.c8DogprPUm69u62wEeFT8EQDIRs5jam',
    'student'
WHERE NOT EXISTS (
    SELECT 1 FROM users
    WHERE email = 'demo.student1@ucu.ac.ug'
);

-- Insert a second fictional Student account.
INSERT INTO users (full_name, email, student_number, password, role)
SELECT
    'Demo Student Two',
    'demo.student2@ucu.ac.ug',
    'UCUDEMO002',
    '$2b$12$H.SUQFcSTcAoJ6T6Hu.nV.c8DogprPUm69u62wEeFT8EQDIRs5jam',
    'student'
WHERE NOT EXISTS (
    SELECT 1 FROM users
    WHERE email = 'demo.student2@ucu.ac.ug'
);

-- Insert a fictional ordinary Administrator account.
INSERT INTO users (full_name, email, student_number, password, role)
SELECT
    'Demo Administrator',
    'demo.admin@ucu.ac.ug',
    NULL,
    '$2b$12$H.SUQFcSTcAoJ6T6Hu.nV.c8DogprPUm69u62wEeFT8EQDIRs5jam',
    'admin'
WHERE NOT EXISTS (
    SELECT 1 FROM users
    WHERE email = 'demo.admin@ucu.ac.ug'
);

-- Insert a fictional Main Administrator account.
INSERT INTO users (full_name, email, student_number, password, role)
SELECT
    'Demo Main Administrator',
    'demo.mainadmin@ucu.ac.ug',
    NULL,
    '$2b$12$H.SUQFcSTcAoJ6T6Hu.nV.c8DogprPUm69u62wEeFT8EQDIRs5jam',
    'super_admin'
WHERE NOT EXISTS (
    SELECT 1 FROM users
    WHERE email = 'demo.mainadmin@ucu.ac.ug'
);
-- Insert a fictional found laptop report.
INSERT INTO reports (
    user_id, report_type, title, category, description,
    private_details, date_lost_found, location
)
SELECT
    user_id,
    'found',
    'Found Silver Laptop',
    'Electronics',
    'A silver laptop was found near the university library.',
    'The laptop has a small blue sticker underneath.',
    '2026-11-15',
    'UCU Main Library'
FROM users
WHERE email = 'demo.student1@ucu.ac.ug'
AND NOT EXISTS (
    SELECT 1 FROM reports
    WHERE title = 'Found Silver Laptop'
    AND user_id = (
        SELECT user_id FROM users
        WHERE email = 'demo.student1@ucu.ac.ug'
    )
);

-- Insert a fictional lost student identification card report.
INSERT INTO reports (
    user_id, report_type, title, category, description,
    private_details, date_lost_found, location
)
SELECT
    user_id,
    'lost',
    'Lost Student Identification Card',
    'Documents',
    'A student identification card was lost around the cafeteria.',
    'The card has a handwritten phone number on its back.',
    '2026-11-16',
    'UCU Cafeteria'
FROM users
WHERE email = 'demo.student2@ucu.ac.ug'
AND NOT EXISTS (
    SELECT 1 FROM reports
    WHERE title = 'Lost Student Identification Card'
    AND user_id = (
        SELECT user_id FROM users
        WHERE email = 'demo.student2@ucu.ac.ug'
    )
);
-- Insert a fictional pending claim for the found laptop.
INSERT INTO claims (
    report_id,
    claimant_id,
    claim_evidence,
    status
)
SELECT
    r.report_id,
    u.user_id,
    'I can identify the laptop and describe its distinctive blue sticker.',
    'pending'
FROM reports r
JOIN users u
    ON u.email = 'demo.student2@ucu.ac.ug'
WHERE r.title = 'Found Silver Laptop'
AND r.report_type = 'found'
AND NOT EXISTS (
    SELECT 1
    FROM claims c
    WHERE c.report_id = r.report_id
    AND c.claimant_id = u.user_id
);