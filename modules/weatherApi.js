const axios = require("axios");
const moment = require("moment");
const getDiff = require("./getDiff");

// Each API call to a weather service should return current weather and tomorrow's prediction

// https://www.weatherapi.com/docs/

const getWeatherApi = async (previousForecast) => {
  const currentWeatherData = await axios(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Toronto`
  );

  const currentWeather = currentWeatherData.data.current.temp_c;

  // this API is picky compared to the others - the call includes the date requested along with the hour

  const myDate = moment().add(1, "d").format("YYYY-MM-DD");

  const forecastData = await axios(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=Toronto&dt=${myDate}&hour=15`
  );

  const forecast = forecastData.data.forecast.forecastday[0].hour[0].temp_c;

  // get difference between currentWeather and previousForecast

  const rating = 10 - getDiff(previousForecast, currentWeather);

  console.log(
    `weatherApi current weather is ${currentWeather} -- forecast is ${forecast} -- weekly rating is ${rating}`
  );

  return {
    currentWeather,
    forecast,
    rating,
  };
};

module.exports = getWeatherApi;
