const axios = require("axios").default;
const getDiff = require("./getDiff");

weatherBit = async (previousForecast) => {
  const currentOptions = {
    method: "GET",
    url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
    params: { lon: "-79.3", lat: "43.6" },
    headers: {
      "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  const currentWeatherData = await axios.request(currentOptions);

  const currentWeather = currentWeatherData.data.data[0].temp;

  const options = {
    method: "GET",
    url: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly",
    params: { lon: "-79.3", lat: "43.6" },
    headers: {
      "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  const forecastData = await axios.request(options);

  const forecast = forecastData.data.data[7].temp;

  // get difference between currentWeather and previousForecast

  const rating = 10 - parseFloat(getDiff(previousForecast, currentWeather).toFixed(2));

  console.log(
    `weatherBit current weather is ${currentWeather} -- forecast is ${forecast} -- weekly rating is ${rating}`
  );

  return {
    currentWeather,
    forecast,
    rating,
  };
};

module.exports = weatherBit;
