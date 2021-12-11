const axios = require("axios");
const getDiff = require("./getDiff");

///https://www.visualcrossing.com/weather/weather-data-services#/timeline

const visualCrossing = async (previousForecast) => {
  const currentWeatherData = await axios(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toronto?unitGroup=metric&key=${process.env.VISUALCROSSING_API_KEY}&include=current`
  );

  const currentWeather = currentWeatherData.data.currentConditions.temp;

  const forecastWeatherData = await axios(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toronto?unitGroup=metric&key=${process.env.VISUALCROSSING_API_KEY}&include=hours`
  );

  const forecast = forecastWeatherData.data.days[1].hours[15].temp;

  // get difference between currentWeather and previousForecast

  const rating = 10 - parseFloat(getDiff(previousForecast, currentWeather).toFixed(2));

  console.log(
    `visualCrossing current weather is ${currentWeather} -- forecast is ${forecast} -- weekly rating is ${rating}`
  );

  return {
    currentWeather,
    forecast,
    rating,
  };
};

module.exports = visualCrossing;
