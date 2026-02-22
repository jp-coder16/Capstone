export const getAQIColor = (aqi) => {
  if (aqi <= 50) return "#4caf50";
  if (aqi <= 100) return "#ffeb3b";
  if (aqi <= 200) return "#ff9800";
  if (aqi <= 300) return "#f44336";
  return "#6a1b9a";
};

export const getRiskLabel = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};