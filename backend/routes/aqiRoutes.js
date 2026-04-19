const express = require("express");
const router = express.Router();
const { getCurrentAQI, getHistory } = require("../controllers/aqiController");

router.get("/current", getCurrentAQI);
router.get("/history", getHistory);

module.exports = router;