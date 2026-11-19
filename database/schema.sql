-- Create the UNI-FIND database if it does not already exist.
CREATE DATABASE IF NOT EXISTS uni_find
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

-- Select the UNI-FIND database for table creation.
USE uni_find;
-- Create the users table to store student and administrator accounts.
CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    student_number VARCHAR(50) DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin', 'super_admin') NOT NULL DEFAULT 'student',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    -- Set user_id as the primary key.
    PRIMARY KEY (user_id),

    -- Ensure that each email address belongs to only one account.
    UNIQUE KEY email (email),

    -- Ensure that each student number belongs to only one account.
    UNIQUE KEY student_number (student_number)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
-- Create the reports table to store lost and found item reports.
CREATE TABLE IF NOT EXISTS reports (
    report_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    report_type ENUM('lost', 'found') NOT NULL,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(80) NOT NULL,
    description TEXT NOT NULL,
    private_details TEXT DEFAULT NULL,
    date_lost_found DATE NOT NULL,
    location VARCHAR(150) NOT NULL,
    photo VARCHAR(255) DEFAULT NULL,
    status ENUM('open', 'returned') NOT NULL DEFAULT 'open',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    moderation_status ENUM('visible', 'hidden') NOT NULL DEFAULT 'visible',

    -- Set report_id as the primary key.
    PRIMARY KEY (report_id),

    -- Create an index for the user who submitted each report.
    KEY fk_reports_user (user_id),

    -- Link every report to the account that created it.
    CONSTRAINT fk_reports_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
-- Create the claims table to store student claims for found items.
CREATE TABLE IF NOT EXISTS claims (
    claim_id INT NOT NULL AUTO_INCREMENT,
    report_id INT NOT NULL,
    claimant_id INT NOT NULL,
    claim_evidence TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    admin_response TEXT DEFAULT NULL,
    reviewed_by INT DEFAULT NULL,
    reviewed_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    -- Set claim_id as the primary key.
    PRIMARY KEY (claim_id),

    -- Create indexes for the related report, student and reviewing Admin.
    KEY fk_claims_report (report_id),
    KEY fk_claims_student (claimant_id),
    KEY fk_claims_admin (reviewed_by),

    -- Link each claim to the found-item report.
    CONSTRAINT fk_claims_report
        FOREIGN KEY (report_id) REFERENCES reports(report_id),

    -- Link each claim to the student who submitted it.
    CONSTRAINT fk_claims_student
        FOREIGN KEY (claimant_id) REFERENCES users(user_id),

    -- Link the review to the administrator who handled it.
    CONSTRAINT fk_claims_admin
        FOREIGN KEY (reviewed_by) REFERENCES users(user_id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
-- Create the return_records table to record successful item collections.
CREATE TABLE IF NOT EXISTS return_records (
    return_id INT NOT NULL AUTO_INCREMENT,
    report_id INT NOT NULL,
    claim_id INT NOT NULL,
    confirmed_by INT NOT NULL,
    collection_date DATETIME NOT NULL,
    notes TEXT DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    -- Set return_id as the primary key.
    PRIMARY KEY (return_id),

    -- Ensure each report can only have one return record.
    UNIQUE KEY report_id (report_id),

    -- Ensure each approved claim can only be returned once.
    UNIQUE KEY claim_id (claim_id),

    -- Create an index for the administrator confirming collection.
    KEY fk_returns_admin (confirmed_by),

    -- Link the return record to the original report.
    CONSTRAINT fk_returns_report
        FOREIGN KEY (report_id) REFERENCES reports(report_id),

    -- Link the return record to the approved claim.
    CONSTRAINT fk_returns_claim
        FOREIGN KEY (claim_id) REFERENCES claims(claim_id),

    -- Link the return record to the administrator confirming collection.
    CONSTRAINT fk_returns_admin
        FOREIGN KEY (confirmed_by) REFERENCES users(user_id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;