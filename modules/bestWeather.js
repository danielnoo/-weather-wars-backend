const axios = require("axios").default;
const getDiff = require("./getDiff");

const bestWeather = async (previousForecast) => {
  const options = {
    method: "GET",
    url: "https://bestweather.p.rapidapi.com/weather/Toronto",
    params: { unitGroup: "us" },
    headers: {
      "x-rapidapi-host": "bestweather.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  const data = await axios.request(options);

  let forecast = (data.data.days[1].hours[15].temp - 32) * (5 / 9);
  forecast = parseFloat(forecast.toFixed(1));
  let currentWeather = (data.data.currentConditions.temp - 32) * (5 / 9);
  currentWeather = parseFloat(currentWeather.toFixed(1));

  // get difference between currentWeather and previousForecast

  const rating = 10 - parseFloat(getDiff(previousForecast, currentWeather).toFixed(2));

  console.log(
    `bestWeather current weather is ${currentWeather} -- forecast is ${forecast} -- weekly rating is ${rating}`
  );

  return {
    currentWeather,
    forecast,
    rating,
  };
};

module.exports = bestWeather;
