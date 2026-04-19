exports.getRecommendation = (data) => {
  const { aqi, pm25 } = data;

  let risk = "Low";
  let workout = "Outdoor Walk";
  let mask = "None";
  let outdoor = true;

  if (aqi > 100) {
    risk = "Medium";
    workout = "Light Indoor Exercise";
    mask = "Surgical Mask";
    outdoor = false;
  }

  if (aqi > 200) {
    risk = "High";
    workout = "Indoor Yoga";
    mask = "N95";
    outdoor = false;
  }

  return {
    risk,
    workout,
    mask,
    outdoor
  };
};