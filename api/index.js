require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initTable } = require("../src/services/paste.service");

const app = express();
app.use(cors());
app.use(express.json({ limit: "256kb" }));

initTable().catch((e) => console.error("initTable failed:", e));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Pastebin API - Use /api/pastes to create pastes, /api/healthz for health check",
    endpoints: {
      "POST /api/pastes": "Create a new paste",
      "GET /api/pastes/:id": "Get paste by ID",
      "GET /p/:id": "View paste in HTML format",
      "GET /api/healthz": "Health check endpoint"
    }
  });
});

module.exports = app;