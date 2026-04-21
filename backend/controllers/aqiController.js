const axios = require("axios");

exports.getPrediction = async (req, res) => {
    try {
        const response = await axios.post("http://localhost:8000/predict", {
            pm25: req.body.pm25,
            pm10: req.body.pm10,
            no2: req.body.no2,
            so2: req.body.so2,
            co: req.body.co,
            o3: req.body.o3,
            temp: req.body.temp,
            humidity: req.body.humidity,
            wind: req.body.wind
        });

        res.json({
            success: true,
            prediction: response.data.predicted_aqi
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "ML service failed" });
    }
};