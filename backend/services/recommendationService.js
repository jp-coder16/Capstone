exports.getRecommendation = (latest) => {
  if (!latest || !latest.aqi) {
    return {
      risk: "Unknown",
      workout: "Unable to fetch AQI",
      hygiene: "Check connection"
    };
  }

  const aqi = latest.aqi;

  if (aqi <= 50) {
    return {
      risk: "Low",
      workout: "Outdoor activities allowed ✅ (yoga, running, cycling)",
      hygiene: "No mask needed. Normal ventilation."
    };
  } else if (aqi <= 100) {
    return {
      risk: "Medium",
      workout: "Limit outdoor time. Prefer indoor exercises.",
      hygiene: "Light mask recommended for sensitive people."
    };
  } else {
    return {
      risk: "High",
      workout: "Stay indoors only. Breathing exercises / indoor yoga.",
      hygiene: "N95 mask if going out. Close windows. Stay hydrated."
    };
  }
};