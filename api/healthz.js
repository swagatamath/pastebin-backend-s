require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("../src/db/postgres");

const app = express();
app.use(cors());

app.get("/api/healthz", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ ok: false });
  }
});

module.exports = app;