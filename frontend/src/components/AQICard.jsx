function AQICard({ aqi }) {
  const getColor = () => {
    if (aqi <= 50) return "#16a34a";
    if (aqi <= 100) return "#facc15";
    if (aqi <= 200) return "#f97316";
    return "#ef4444";
  };

  return (
    <div style={{ ...styles.card, borderLeft: `10px solid ${getColor()}` }}>
      <h3>Current AQI</h3>
      <h1>{aqi}</h1>
      <p>Status: {aqi <= 100 ? "Safe" : "Unhealthy"}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "300px",
  },
};

export default AQICard;