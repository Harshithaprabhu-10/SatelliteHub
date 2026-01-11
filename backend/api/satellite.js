const express = require('express');
const router = express.Router();
const db = require('../server/db');

// ================= GET ALL SATELLITES =================
router.get('/', async (req, res) => {
    const [rows] = await db.query(`
        SELECT s.*, o.orbit_type AS orbit_type, l.launch_date AS launch_date
        FROM Satellite s
        LEFT JOIN Orbit o ON s.orbit_id = o.orbit_id
        LEFT JOIN Launch l ON s.launch_id = l.launch_id
    `);
    res.json(rows);
});

// ================= GET SATELLITE BY ID =================
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.query(`
        SELECT s.*, o.orbit_type AS orbit_type, l.launch_date AS launch_date
        FROM Satellite s
        LEFT JOIN Orbit o ON s.orbit_id = o.orbit_id
        LEFT JOIN Launch l ON s.launch_id = l.launch_id
        WHERE s.satellite_id = ?
    `, [id]);

    if (rows.length === 0) return res.status(404).json({ message: "Satellite not found" });
    res.json(rows[0]);
});

// ================= ADD SATELLITE =================
router.post('/', async (req, res) => {
    const { name, country, orbit_id, status, norad_id, launch_date } = req.body;

    const [launchResult] = await db.query(
        "INSERT INTO Launch (launch_date) VALUES (?)",
        [launch_date]
    );

    const launch_id = launchResult.insertId;

    await db.query(
        "INSERT INTO Satellite(name, country, orbit_id, launch_id, status, norad_id) VALUES (?, ?, ?, ?, ?, ?)",
        [name, country, orbit_id, launch_id, status, norad_id]
    );

    res.json({ message: "Satellite added" });
});

// ================= UPDATE SATELLITE =================
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, country, orbit_id, status, norad_id, launch_date } = req.body;

    await db.query(
        "UPDATE Launch l JOIN Satellite s ON l.launch_id = s.launch_id SET l.launch_date=? WHERE s.satellite_id=?",
        [launch_date, id]
    );

    await db.query(
        "UPDATE Satellite SET name=?, country=?, orbit_id=?, status=?, norad_id=? WHERE satellite_id=?",
        [name, country, orbit_id, status, norad_id, id]
    );

    res.json({ message: "Satellite updated" });
});

// ================= DELETE SATELLITE =================
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await db.query("DELETE FROM Satellite WHERE satellite_id=?", [id]);
    res.json({ message: "Satellite deleted" });
});

module.exports = router;
