import Navbar from "../components/Navbar";
import AQIGauge from "../components/AQIGauge";
import AQIChart from "../components/AQIchart";
import RecommendationCard from "../components/RecommendationCard";

function Dashboard() {
  const currentAQI = 145;

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.content}>
        {/* Top Stats Section */}
        <div style={styles.topGrid}>
          <AQIGauge aqi={currentAQI} />
          <RecommendationCard />
        </div>

        {/* Chart Section */}
        <div style={styles.chartSection}>
          <AQIChart />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(to right, #e2e8f0, #f8fafc)",
    minHeight: "100vh",
  },
  content: {
    padding: "40px 60px",
  },
  topGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
  },
  chartSection: {
    marginTop: "40px",
  },
};

export default Dashboard;