USE satellitehub;

-----------------------------------------------------
-- ORBITS (10 rows)
-----------------------------------------------------
INSERT INTO Orbit (orbit_type, altitude_km, inclination_deg, orbital_period_min) VALUES
('LEO', 550, 53.0, 95),
('LEO', 600, 97.6, 96),
('GEO', 35786, 0.0, 1440),
('MEO', 20180, 56.0, 720),
('HEO', 40000, 63.4, 720),
('LEO', 500, 51.6, 94),
('MEO', 23222, 55.0, 780),
('GEO', 36000, 0.1, 1441),
('LEO', 700, 98.2, 98),
('LEO', 540, 45.0, 93);

-----------------------------------------------------
-- LAUNCHES (10 rows)
-----------------------------------------------------
INSERT INTO Launch (launch_vehicle, launch_site, launch_date, mission_success) VALUES
('Falcon 9', 'Cape Canaveral', '2020-01-29', TRUE),
('Ariane 5', 'French Guiana', '2018-09-25', TRUE),
('PSLV', 'Sriharikota', '2021-02-28', TRUE),
('Soyuz', 'Baikonur', '2019-06-07', TRUE),
('Atlas V', 'Vandenberg', '2017-03-22', TRUE),
('Falcon Heavy', 'Cape Canaveral', '2022-11-01', TRUE),
('Long March 5', 'Wenchang', '2020-05-05', TRUE),
('Electron', 'New Zealand', '2023-02-20', FALSE),
('GSLV', 'Sriharikota', '2016-12-25', TRUE),
('Ariane 6', 'French Guiana', '2024-07-12', TRUE);

-----------------------------------------------------
-- SATELLITES (10 real-world satellites)
-----------------------------------------------------
INSERT INTO Satellite (name, country, launch_id, orbit_id, launched_on, status) VALUES
('Sentinel-6', 'USA', 1, 1, '2020-01-29', 'Active'),
('GSAT-30', 'India', 2, 3, '2020-01-09', 'Active'),
('NAVIC IRNSS-1I', 'India', 3, 4, '2021-04-12', 'Active'),
('Starlink-1500', 'USA', 1, 1, '2022-09-10', 'Active'),
('Hubble Space Telescope', 'USA', 5, 6, '1990-04-24', 'Active'),
('INSAT-3D', 'India', 9, 3, '2013-07-26', 'Active'),
('Gaofen-7', 'China', 7, 2, '2019-11-03', 'Active'),
('Copernicus Sentinel-2A', 'EU', 2, 1, '2015-06-23', 'Active'),
('NOAA-20', 'USA', 4, 9, '2017-11-18', 'Active'),
('Galaxy-30', 'USA', 10, 3, '2020-08-15', 'Active');

-----------------------------------------------------
-- FUNCTIONALITY (10 rows)
-----------------------------------------------------
INSERT INTO Functionality (function_name, description) VALUES
('Communication', 'Broadcasting and telecom'),
('Earth Observation', 'Environmental and mapping operations'),
('Navigation', 'GPS and location services'),
('Weather Monitoring', 'Climate and storm tracking'),
('Scientific Research', 'Space science missions'),
('Imaging', 'High resolution pictures'),
('Defense', 'Military surveillance'),
('Disaster Management', 'Emergency support'),
('IoT Connectivity', 'Internet-of-Things support'),
('Space Telescope', 'Deep space observation');

-----------------------------------------------------
-- M:N RELATIONSHIP Satellite_Functionality
-----------------------------------------------------
INSERT INTO Satellite_Functionality VALUES
(1,2),
(2,1),
(3,3),
(4,1),
(4,9),
(5,10),
(6,1),
(6,4),
(7,2),
(8,2),
(9,4),
(10,1),
(10,5);
