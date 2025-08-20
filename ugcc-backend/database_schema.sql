-- UGCC Database Schema
-- University of Guyana Computer Club Database

CREATE DATABASE ugcc_db;
USE ugcc_db;

-- Table for prospective members (interest registration)
CREATE TABLE prospects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    national_id VARCHAR(9) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    interest TEXT,
    academic_level VARCHAR(100),
    field_of_study VARCHAR(255),
    experience_level VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for registered members (for login and membership)
CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    national_id VARCHAR(9) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    academic_level VARCHAR(100),
    field_of_study VARCHAR(255),
    experience_level VARCHAR(100),
    status ENUM('active', 'inactive', 'pending') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for member profiles (extended information)
CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT NOT NULL,
    bio TEXT,
    skills TEXT,
    profile_picture_url VARCHAR(255),
    github_username VARCHAR(100),
    linkedin_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- Table for club events
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(255),
    max_participants INT DEFAULT 0,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES members(id) ON DELETE SET NULL
);

-- Table for event registrations
CREATE TABLE event_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    member_id INT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    UNIQUE KEY unique_registration (event_id, member_id)
);

-- Table for club projects
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('active', 'completed', 'on_hold') DEFAULT 'active',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES members(id) ON DELETE SET NULL
);

-- Table for project participants
CREATE TABLE project_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    member_id INT NOT NULL,
    role VARCHAR(100) DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    UNIQUE KEY unique_participation (project_id, member_id)
);

-- Table for club announcements/news
CREATE TABLE announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_by INT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES members(id) ON DELETE SET NULL
);

-- Indexes for better performance
CREATE INDEX idx_prospects_email ON prospects(email);
CREATE INDEX idx_prospects_national_id ON prospects(national_id);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_username ON members(username);
CREATE INDEX idx_members_national_id ON members(national_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_projects_status ON projects(status);

-- Insert some sample data for demonstration

-- Sample prospects
INSERT INTO prospects (first_name, last_name, national_id, email, phone, interest, academic_level, experience_level) VALUES
('John', 'Smith', 'AB1234567', 'john.smith@example.com', '+592123456789', 'Interested in web development and AI', 'Undergraduate Year 2', 'Some Basic Knowledge'),
('Jane', 'Doe', 'CD9876543', 'jane.doe@example.com', '+592987654321', 'Passionate about cybersecurity and network administration', 'Graduate/Masters', 'Advanced');

-- Sample members (password is 'password123' hashed)
INSERT INTO members (first_name, last_name, national_id, username, email, password_hash, phone, academic_level, field_of_study, experience_level) VALUES
('Alice', 'Johnson', 'EF5555555', 'alicej', 'alice.johnson@student.ug.edu.gy', '$2a$10$K7L/uRoa/lX4/cJcGbWjKOxHqjlFGhEy8F8a4d3wNqO8YpLtNgHtq', '+592555123456', 'Undergraduate Year 3', 'Computer Science', 'Intermediate'),
('Bob', 'Wilson', 'GH1111111', 'bobw', 'bob.wilson@student.ug.edu.gy', '$2a$10$K7L/uRoa/lX4/cJcGbWjKOxHqjlFGhEy8F8a4d3wNqO8YpLtNgHtq', '+592111234567', 'Undergraduate Year 4+', 'Information Technology', 'Advanced');

-- Sample profiles
INSERT INTO profiles (member_id, bio, skills) VALUES
(1, 'Computer Science student passionate about full-stack development and machine learning. Currently working on personal projects using React and Python.', 'JavaScript, React, Python, MySQL, HTML/CSS'),
(2, 'Senior IT student with experience in system administration and network security. Interested in cybersecurity research and cloud computing.', 'Java, Linux, Network Security, AWS, Docker, Python');

-- Sample events
INSERT INTO events (title, description, event_date, event_time, location, max_participants, created_by) VALUES
('JavaScript Fundamentals Workshop', 'Learn the basics of JavaScript programming from variables to functions', '2024-03-15', '14:00:00', 'Computer Lab A', 25, 1),
('Git & GitHub Tutorial', 'Version control for beginners - learn how to manage your code effectively', '2024-03-22', '16:00:00', 'Computer Lab B', 20, 2),
('Monthly Coding Challenge', 'Solve algorithmic problems and win prizes in our monthly competition', '2024-03-30', '18:00:00', 'Main Auditorium', 50, 1);

-- Sample projects
INSERT INTO projects (name, description, created_by) VALUES
('University Student Portal', 'A web application for students to access their academic information, register for courses, and communicate with faculty', 1),
('UGCC Website Redesign', 'Modernizing the club website with a fresh design and improved functionality', 2),
('Library Management System', 'Digital solution for managing library books, reservations, and member records', 1);

-- Sample project participants
INSERT INTO project_participants (project_id, member_id, role) VALUES
(1, 1, 'Project Lead'),
(1, 2, 'Backend Developer'),
(2, 2, 'Project Lead'),
(3, 1, 'Full Stack Developer');

-- Sample announcements
INSERT INTO announcements (title, content, created_by) VALUES
('Welcome New Members!', 'We are excited to welcome our new members to UGCC. Join us for our orientation session next week.', 1),
('Hackathon Registration Open', 'Registration is now open for our annual hackathon. Form your teams and get ready for 48 hours of coding!', 2),
('Partnership with Local Tech Companies', 'We are pleased to announce new partnerships with local technology companies offering internship opportunities to our members.', 1);