function RecommendationCard() {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Health Recommendations</h3>

      <ul style={styles.list}>
        <li>😷 Wear mask if AQI is high</li>
        <li>🏃 Avoid outdoor workouts</li>
        <li>💧 Drink more water</li>
        <li>🌬 Improve ventilation indoors</li>
      </ul>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: "20px",
  },
  list: {
    lineHeight: "2",
    fontSize: "16px",
  },
};

export default RecommendationCard;