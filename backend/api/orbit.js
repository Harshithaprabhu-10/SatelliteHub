const express = require("express");
const router = express.Router();
const db = require("../server/db");

// GET all orbits
router.get("/", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM Orbit");
    res.json(rows);
});

// ADD orbit
router.post("/", async (req, res) => {
    const { orbit_type, altitude_km, inclination_deg, orbital_period_min } = req.body;

    await db.query(
        "INSERT INTO Orbit (orbit_type, altitude_km, inclination_deg, orbital_period_min) VALUES (?, ?, ?, ?)",
        [orbit_type, altitude_km, inclination_deg, orbital_period_min]
    );

    res.json({ message: "Orbit added" });
});

// UPDATE orbit
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { orbit_type, altitude_km, inclination_deg, orbital_period_min } = req.body;

    await db.query(
        "UPDATE Orbit SET orbit_type=?, altitude_km=?, inclination_deg=?, orbital_period_min=? WHERE orbit_id=?",
        [orbit_type, altitude_km, inclination_deg, orbital_period_min, id]
    );

    res.json({ message: "Orbit updated" });
});

// DELETE orbit
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    await db.query("DELETE FROM Orbit WHERE orbit_id=?", [id]);
    res.json({ message: "Orbit deleted" });
});

module.exports = router;
