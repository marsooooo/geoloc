function getLocation() {
  if (!("geolocation" in navigator)) {
    alert("Ton navigateur ne supporte pas la géolocalisation.");
    return;
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      };

      console.log("Coordonnées récupérées :", coords);

      // Envoi au backend
      fetch("/save-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coords)
      })
        .then((res) => res.json())
        .then((data) => console.log("Réponse serveur :", data))
        .catch((err) => console.error("Erreur envoi :", err));
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("Permission refusée");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Position non disponible");
          break;
        case error.TIMEOUT:
          console.error("Temps dépassé");
          break;
        default:
          console.error("Erreur inconnue", error);
      }
    },
    options
  );
}

document.getElementById("sendBtn").addEventListener("click", getLocation);
