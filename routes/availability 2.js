const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { date, start, end } = req.body;
  const linkId = Math.random().toString(36).substring(2, 10);
  const [result] = await db.execute(
    "INSERT INTO availability (user_id, date, start, end, link_id) VALUES (?, ?, ?, ?, ?)",
    [req.user.id, date, start, end, linkId]
  );
  res.json({ id: result.insertId, date, start, end, linkId });
});

router.get("/:linkId", async (req, res) => {
  const [slots] = await db.execute(
    "SELECT * FROM availability WHERE link_id = ?",
    [req.params.linkId]
  );
  if (!slots.length) return res.status(404).json("Invalid link");
  res.json(slots);
});

module.exports = router;
