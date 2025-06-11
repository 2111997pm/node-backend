const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/:linkId/:date", async (req, res) => {
  const { linkId, date } = req.params;
  const [booked] = await db.execute(
    "SELECT time FROM bookings WHERE link_id = ? AND date = ?",
    [linkId, date]
  );
  res.json(booked.map((b) => b.time));
});

router.post("/", async (req, res) => {
  const { linkId, date, time } = req.body;
  const [existing] = await db.execute(
    "SELECT * FROM bookings WHERE link_id = ? AND date = ? AND time = ?",
    [linkId, date, time]
  );
  if (existing.length) return res.status(400).json("Slot already booked");
  await db.execute(
    "INSERT INTO bookings (link_id, date, time) VALUES (?, ?, ?)",
    [linkId, date, time]
  );
  res.json("Booked");
});

module.exports = router;
