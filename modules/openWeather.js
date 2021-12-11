const axios = require("axios").default;
const getDiff = require("./getDiff");

const openWeather = async (previousForecast) => {
  const forecastOptions = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/forecast",
    params: { q: "toronto, ca", units: "metric" },

    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };
  const currentOptions = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    params: {
      q: "toronto, ca",
      units: "metric",
    },
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  const forecastData = await axios.request(forecastOptions);

  let forecast = forecastData.data.list[6].main.temp;
  forecast = parseFloat(forecast.toFixed(1));

  const currentWeatherData = await axios.request(currentOptions);

  let currentWeather = currentWeatherData.data.main.temp;
  currentWeather = parseFloat(currentWeather.toFixed(1));

  // get difference between currentWeather and previousForecast

  const rating = 10 - parseFloat(getDiff(previousForecast, currentWeather).toFixed(2));

  console.log(
    `openWeather current weather is ${currentWeather} -- forecast is ${forecast} -- weekly rating is ${rating}`
  );

  return {
    currentWeather,
    forecast,
    rating,
  };
};

module.exports = openWeather;
