require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { fetchPasteAtomic, initTable } = require("../../src/services/paste.service");

const app = express();
app.use(cors());

initTable().catch((e) => console.error("initTable failed:", e));

function nowForExpiryOnly(req) {
  if (process.env.TEST_MODE === "1") {
    const h = req.get("x-test-now-ms");
    if (h) {
      const n = Number(h);
      if (Number.isFinite(n)) return new Date(n);
    }
  }
  return new Date();
}

app.get("/api/pastes/:id", async (req, res) => {
  const now = nowForExpiryOnly(req);
  const id = req.params.id;

  const row = await fetchPasteAtomic({ id, now });
  if (!row) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.status(200).json({
    content: row.content,
    remaining_views: row.remaining_views === null ? null : row.remaining_views,
    expires_at: row.expires_at === null ? null : new Date(row.expires_at).toISOString()
  });
});

module.exports = app;