CREATE DATABASE IF NOT EXISTS satellitehub;
USE satellitehub;

-- 1. Satellite
CREATE TABLE Satellite (
    satellite_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100),
    launch_id INT,
    orbit_id INT,
    launched_on DATE,
    status ENUM('Active', 'Inactive') DEFAULT 'Active'
);

-- 2. Orbit
CREATE TABLE Orbit (
    orbit_id INT AUTO_INCREMENT PRIMARY KEY,
    orbit_type ENUM('LEO','MEO','GEO','HEO') NOT NULL,
    altitude_km INT,
    inclination_deg DECIMAL(5,2),
    orbital_period_min INT
);

-- 3. Launch
CREATE TABLE Launch (
    launch_id INT AUTO_INCREMENT PRIMARY KEY,
    launch_vehicle VARCHAR(100),
    launch_site VARCHAR(100),
    launch_date DATE,
    mission_success BOOLEAN
);

-- 4. Functionality
CREATE TABLE Functionality (
    function_id INT AUTO_INCREMENT PRIMARY KEY,
    function_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 5. Satellite_Functionality (M:N relationship)
CREATE TABLE Satellite_Functionality (
    satellite_id INT,
    function_id INT,
    PRIMARY KEY (satellite_id, function_id),
    FOREIGN KEY (satellite_id) REFERENCES Satellite(satellite_id) ON DELETE CASCADE,
    FOREIGN KEY (function_id) REFERENCES Functionality(function_id) ON DELETE CASCADE
);

---------------------------------------------------------
-- TRIGGERS
---------------------------------------------------------

-- Log table
CREATE TABLE Satellite_Log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    satellite_id INT,
    action VARCHAR(20),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger: Record when a satellite is inserted
CREATE TRIGGER trg_satellite_insert
AFTER INSERT ON Satellite
FOR EACH ROW
INSERT INTO Satellite_Log(satellite_id, action)
VALUES (NEW.satellite_id, 'INSERT');

-- Trigger: Record when a satellite is updated
CREATE TRIGGER trg_satellite_update
AFTER UPDATE ON Satellite
FOR EACH ROW
INSERT INTO Satellite_Log(satellite_id, action)
VALUES (NEW.satellite_id, 'UPDATE');

---------------------------------------------------------
-- EVENTS
---------------------------------------------------------

-- Event: Auto-mark satellites inactive if launched before 2000
CREATE EVENT IF NOT EXISTS ev_mark_old_satellites
ON SCHEDULE EVERY 1 DAY
DO
    UPDATE Satellite
    SET status = 'Inactive'
    WHERE launched_on < '2000-01-01';
