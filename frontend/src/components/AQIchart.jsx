import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AQIChart() {
  const data = [
    { day: "Mon", aqi: 90 },
    { day: "Tue", aqi: 110 },
    { day: "Wed", aqi: 130 },
    { day: "Thu", aqi: 150 },
    { day: "Fri", aqi: 120 },
    { day: "Sat", aqi: 100 },
    { day: "Sun", aqi: 140 },
  ];

  return (
    <div style={styles.card}>
      <h3>Weekly AQI Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="aqi"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
};

export default AQIChart;