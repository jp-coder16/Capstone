/**
 * Generate recommendations based on AQI and PM2.5
 */
const getRecommendations = (aqi, pm25) => {
  let risk = 'Low';
  let workout = 'Outdoor activities allowed';
  let mask = 'No mask needed';
  let outdoorAllowed = true;
  let tips = ['Enjoy outdoor time'];

  if (aqi > 300) {
    risk = 'Hazardous';
    workout = 'Stay indoors, no physical exertion';
    mask = 'N95 mandatory';
    outdoorAllowed = false;
    tips = ['Avoid all outdoor activity', 'Use air purifier', 'Keep windows closed'];
  } else if (aqi > 200) {
    risk = 'Very Unhealthy';
    workout = 'Indoor yoga only';
    mask = 'N95 recommended';
    outdoorAllowed = false;
    tips = ['Avoid outdoor exercise', 'Limit exposure'];
  } else if (aqi > 150) {
    risk = 'Unhealthy';
    workout = 'Light indoor exercise';
    mask = 'Surgical mask';
    outdoorAllowed = false;
    tips = ['Reduce outdoor time', 'Wear mask if going out'];
  } else if (aqi > 100) {
    risk = 'Unhealthy for Sensitive Groups';
    workout = 'Limited outdoor activity';
    mask = 'Optional, but advised';
    outdoorAllowed = true;
    tips = ['Sensitive individuals should limit outdoor exposure'];
  } else if (aqi > 50) {
    risk = 'Moderate';
    workout = 'Outdoor OK for most';
    mask = 'Not needed';
    outdoorAllowed = true;
    tips = ['Acceptable air quality'];
  } else {
    risk = 'Good';
    workout = 'Full outdoor activities';
    mask = 'None';
    outdoorAllowed = true;
    tips = ['Excellent air quality'];
  }

  return {
    risk,
    workout,
    mask,
    outdoorAllowed,
    tips
  };
};

module.exports = { getRecommendations };