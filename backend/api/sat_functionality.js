const express = require("express");
const router = express.Router();
const db = require("../server/db");

// GET all satellite-functionality relationships
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT sf.*, s.name AS satellite_name, f.function_name 
            FROM Satellite_Functionality sf
            JOIN Satellite s ON sf.satellite_id = s.satellite_id
            JOIN Functionality f ON sf.function_id = f.function_id
        `);
        res.json(rows);
    } catch (err) {
        console.error("GET ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

// ADD relation
router.post("/", async (req, res) => {
    try {
        const { satellite_id, function_id } = req.body;

        await db.query(
            "INSERT INTO Satellite_Functionality (satellite_id, function_id) VALUES (?, ?)",
            [satellite_id, function_id]
        );

        res.json({ message: "Relation added" });
    } catch (err) {
        console.error("POST ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

// UPDATE relation (change functionality for satellite)
router.put("/", async (req, res) => {
    try {
        const { old_satellite_id, old_function_id, new_function_id } = req.body;

        await db.query(
            "UPDATE Satellite_Functionality SET function_id=? WHERE satellite_id=? AND function_id=?",
            [new_function_id, old_satellite_id, old_function_id]
        );

        res.json({ message: "Relation updated" });
    } catch (err) {
        console.error("PUT ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE relation
router.delete("/", async (req, res) => {
    try {
        const { satellite_id, function_id } = req.body;

        await db.query(
            "DELETE FROM Satellite_Functionality WHERE satellite_id=? AND function_id=?",
            [satellite_id, function_id]
        );

        res.json({ message: "Relation deleted" });
    } catch (err) {
        console.error("DELETE ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
