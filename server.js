import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 4000; // port libre

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint pour recevoir les coordonnées
app.post("/save-location", (req, res) => {
  const { latitude, longitude, accuracy, error } = req.body;

  if (error) {
    console.error("❌ Erreur géoloc reçue :", error);
    return res.json({ status: "error", message: error });
  }

  console.log("📍 Coordonnées reçues :", latitude, longitude, "(±", accuracy, "m)");
  res.json({ status: "ok", latitude, longitude });
});

app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://127.0.0.1:${port}`);
});
