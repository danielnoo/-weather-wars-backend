const axios = require('axios');
const moment = require('moment');

// Each API call to a weather service should return current weather and tomorrow's prediction

// https://www.weatherapi.com/docs/

const getWeatherApi =  async () => {
  const currentWeather = await axios(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Toronto`)

  console.log('this is the current weather', currentWeather);


let myDate = moment().add(1, 'd').format('YYYY-MM-DD')

const forecast = await axios(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=Toronto&dt=2021-11-26&hour=15`
);

 

const result = forecast.data.forecast.forecastday 

console.log('this is the forecast', result[0].hour)

  
  // 

  //   axios({
//   method: "GET",
//   url: `https://www.rijksmuseum.nl/api/en/collection`,
//   dataResponse: "json",
//   params: {
//     key: process.env.WEATHER_API_KEY,
//     format: "json",
//     hasImage: true,
//   },
// })
}

module.exports = getWeatherApi


