import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/save-location", (req, res) => {
  const { latitude, longitude, accuracy } = req.body;
  console.log("📍 Coordonnées reçues :", latitude, longitude, "(±", accuracy, "m)");

  res.json({ status: "ok", message: "Coordonnées reçues !" });
});

app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
