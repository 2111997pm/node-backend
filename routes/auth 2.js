const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed]
  );
  res.json("User registered");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const [[user]] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json("Invalid credentials");
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
