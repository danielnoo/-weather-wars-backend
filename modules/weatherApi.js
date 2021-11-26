const axios = require('axios');
const moment = require('moment');

// Each API call to a weather service should return current weather and tomorrow's prediction

// https://www.weatherapi.com/docs/

const getWeatherApi =  async () => {
  const currentWeatherData = await axios(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Toronto`)

  console.log('Weather API current weather is ', currentWeatherData.data.current.temp_c);

  const currentWeather = currentWeatherData.data.current.temp_c;

  const myDate = moment().add(1, 'd').format('YYYY-MM-DD')

  const forecastData = await axios(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=Toronto&dt=${myDate}&hour=15`
  );

 

  const forecast = forecastData.data.forecast.forecastday[0].hour[0].temp_c;

  console.log('Weather API forecast for 24 hours from now: ', forecast)

  
  return {
    currentWeather,
    forecast
  }

}

module.exports = getWeatherApi


