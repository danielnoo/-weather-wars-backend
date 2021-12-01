// return difference between current weather and previous forecast
// will run during every api request and the value will be attached to the
// object sent to the DB

const getDiff = (previousForecast, currentWeather) => {
  const x = previousForecast - currentWeather;
  const y = currentWeather - previousForecast;

  // return larger of the two differences (the positive one)

  return x > y ? x : y;
};

module.exports = getDiff;
