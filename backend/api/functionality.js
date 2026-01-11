const express = require("express");
const router = express.Router();
const db = require("../server/db");

// GET all functionalities
router.get("/", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM Functionality");
    res.json(rows);
});

// GET functionalities for specific satellite
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.query(`
        SELECT f.function_name, f.description
        FROM Functionality f
        JOIN Satellite_Functionality sf ON f.function_id = sf.function_id
        WHERE sf.satellite_id = ?
    `, [id]);
    res.json(rows);
});

// ADD functionality
// ADD functionality AND link with satellite
router.post("/", async (req, res) => {
    const { satellite_id, function_name, description } = req.body;

    // Insert into Functionality table
    const [result] = await db.query(
        "INSERT INTO Functionality (function_name, description) VALUES (?, ?)",
        [function_name, description]
    );

    const function_id = result.insertId;

    // Link to satellite
    await db.query(
        "INSERT INTO Satellite_Functionality (satellite_id, function_id) VALUES (?, ?)",
        [satellite_id, function_id]
    );

    res.json({ message: "Functionality added and linked", function_id });
});


// UPDATE functionality
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { function_name, description } = req.body;

    await db.query(
        "UPDATE Functionality SET function_name=?, description=? WHERE function_id=?",
        [function_name, description, id]
    );

    res.json({ message: "Functionality updated" });
});

// DELETE functionality
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    await db.query("DELETE FROM Functionality WHERE function_id=?", [id]);
    res.json({ message: "Functionality deleted" });
});

module.exports = router;
