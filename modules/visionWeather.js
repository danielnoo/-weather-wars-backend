const axios = require("axios").default;
const getDiff = require("./getDiff");


const visionWeather = async (previousForecast) => {
  
  let currentWeather;
  let forecast;

    
  const currentOptions = {
    method: "GET",
    url: "https://vision-weather-map.p.rapidapi.com/Current-weather/",
    params: {
      q: "toronto,ca",
      mode: "html",
      units: "metric",
    },
    headers: {
      "x-rapidapi-host": "vision-weather-map.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  const data = await axios.request(currentOptions)

  // for whatever reason, current weather data comes back from this api in one large string. The following is a regex extraction of the temperature reading

  const weatherRead = data.data

  const sliceSpot = weatherRead.search("temp");

  currentWeather = parseFloat(weatherRead.slice(sliceSpot + 6, sliceSpot + 10));


  /////////////////////////////////////////////////////////////
  //forecast

  const forecastOptions = {
    method: "GET",
    url: "https://vision-weather-map.p.rapidapi.com/5-3-day/",
    params: { q: "toronto,ca" },
    headers: {
      "x-rapidapi-host": "vision-weather-map.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  const forecastData = await axios.request(forecastOptions);
  // converting from kelvin to celsius (-273.15)
  forecast = forecastData.data.list[6].main.temp - 273.15;
  // removing extra decimal places
  forecast = parseFloat(forecast.toFixed(2));
  
  
  const rating = 10 - parseFloat(getDiff(previousForecast, currentWeather).toFixed(2));


  console.log(
     `visionWeather current weather is ${currentWeather} -- forecast is ${forecast} -- weekly rating is ${rating}`
  );

  return {
    currentWeather,
    forecast,
    rating,
  };

}

module.exports = visionWeather;