const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.post("/", (req, res) => {
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(req.body) + Math.floor(Math.random() * Date.now()))
    .digest("hex");
  console.log(hash);
  res.send(hash);
});

app.listen(3000, () => {
  console.log(`🦊 Express is running at http://localhost:3000`);
});
