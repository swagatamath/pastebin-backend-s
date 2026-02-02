require("dotenv").config();
const { getPasteForHtml, initTable } = require("../../src/services/paste.service");

initTable().catch((e) => console.error("initTable failed:", e));

function nowForExpiryOnly(req) {
  if (process.env.TEST_MODE === "1") {
    const h = req.headers["x-test-now-ms"];
    if (h) {
      const n = Number(h);
      if (Number.isFinite(n)) return new Date(n);
    }
  }
  return new Date();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const now = nowForExpiryOnly(req);
  const id = req.query.id;

  try {
    const row = await getPasteForHtml({ id, now });
    if (!row) {
      return res.status(404).send("Not Found");
    }

    const safe = escapeHtml(row.content);

    return res.status(200).setHeader("Content-Type", "text/html").send(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Paste ${id}</title>
</head>
<body style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; padding: 24px;">
  <h2 style="margin: 0 0 12px;">Paste</h2>
  <pre style="white-space: pre-wrap; word-break: break-word; padding: 12px; border: 1px solid #ddd; border-radius: 8px;">${safe}</pre>
</body>
</html>`);
  } catch (error) {
    console.error("Error fetching paste:", error);
    return res.status(500).send("Internal Server Error");
  }
};