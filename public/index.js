const output = document.getElementById("output");

function displayMessage(msg) {
  output.textContent = msg;
}

function getLocation() {
  if (!("geolocation" in navigator)) {
    displayMessage("⚠️ Geolocalisation non supportée par ton navigateur.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      };

      displayMessage(`📍 Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);

      // Envoi au backend
      fetch("/save-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coords)
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === "ok") {
            console.log("📡 Coordonnées enregistrées :", data);
          } else {
            console.error("❌ Erreur serveur :", data.message);
          }
        })
        .catch(err => console.error("❌ Erreur envoi :", err));
    },
    (error) => {
      let msg = "";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          msg = "⛔ Permission refusée";
          break;
        case error.POSITION_UNAVAILABLE:
          msg = "📡 Position non disponible";
          break;
        case error.TIMEOUT:
          msg = "⌛ Temps dépassé";
          break;
        default:
          msg = "❓ Erreur inconnue";
      }

      displayMessage(msg);

      // Envoi au serveur pour logging
      fetch("/save-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: msg })
      }).catch(err => console.error("❌ Impossible d'envoyer l'erreur au serveur :", err));
    },
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  );
}

document.getElementById("sendBtn").addEventListener("click", getLocation);
