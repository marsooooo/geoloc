import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint reception
app.post("/save-location", (req, res) => {
  const { latitude, longitude, accuracy, error } = req.body;

  if (error) {
    console.error("Erreur géolocalisation reçue :", error);
    return res.json({ status: "error", message: error });
  }

  const logMsg = `Coordonnées reçues : latitude = ${latitude}, longitude = ${longitude}, précision = ±${accuracy} m`;
  console.log(logMsg);

  res.json({ status: "ok", message: logMsg });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://127.0.0.1:${port}`);
});
