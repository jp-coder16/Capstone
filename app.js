const express = require("express");
const app = express();

app.use(express.json());

const aqiRoutes = require("./backend/routes/aqiRoutes");

app.use("/api/aqi", aqiRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});