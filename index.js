const express = require("express");
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "super_secret_token_123"; // غيرها برمزك الخاص

// GET للتحقق من Webhook
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Verified webhook");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// POST لاستقبال الأحداث من Messenger
app.post("/webhook", (req, res) => {
  console.log("📩 Received event:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("🚀 Webhook server is running on port 3000");
});
