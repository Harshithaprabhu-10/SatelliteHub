const express = require("express");
const router = express.Router();
const db = require("../server/db");

// GET all launches
router.get("/", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM Launch");
    res.json(rows);
});

// ADD launch
router.post("/", async (req, res) => {
    const { launch_vehicle, launch_site, launch_date, mission_success } = req.body;

    await db.query(
        "INSERT INTO Launch (launch_vehicle, launch_site, launch_date, mission_success) VALUES (?, ?, ?, ?)",
        [launch_vehicle, launch_site, launch_date, mission_success]
    );

    res.json({ message: "Launch added" });
});

// UPDATE launch
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { launch_vehicle, launch_site, launch_date, mission_success } = req.body;

    await db.query(
        "UPDATE Launch SET launch_vehicle=?, launch_site=?, launch_date=?, mission_success=? WHERE launch_id=?",
        [launch_vehicle, launch_site, launch_date, mission_success, id]
    );

    res.json({ message: "Launch updated" });
});

// DELETE launch
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    await db.query("DELETE FROM Launch WHERE launch_id=?", [id]);
    res.json({ message: "Launch deleted" });
});

module.exports = router;
