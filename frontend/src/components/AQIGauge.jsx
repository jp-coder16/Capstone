function AQIGauge({ aqi }) {
  const getColor = () => {
    if (aqi <= 50) return "#22c55e";
    if (aqi <= 100) return "#eab308";
    if (aqi <= 200) return "#f97316";
    return "#ef4444";
  };

  return (
    <div style={styles.container}>
      <h3>AQI Level</h3>
      <div
        style={{
          ...styles.circle,
          border: `12px solid ${getColor()}`,
        }}
      >
        <h1>{aqi}</h1>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  circle: {
    width: "170px",
    height: "170px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "25px auto",
  },
};

export default AQIGauge;