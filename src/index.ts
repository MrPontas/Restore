import express from "express";

import "./database";

const app = express();
const port = 3333;

app.get("/", (req, res) => {
  return res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}! 🖥 🖥 🖥 🖥`);
});
