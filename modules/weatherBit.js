const axios = require("axios").default;


weatherBit = async () => {
  
  
  const currentOptions = {
    method: 'GET',
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
    params: {lon: '-79.3', lat: '43.6'},
    headers: {
      'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  }

  const currentWeatherData = await axios.request(currentOptions)

  const currentWeather = currentWeatherData.data.data[0].temp

  const options = {
    method: "GET",
    url: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly",
    params: { lon: "-79.3", lat: "43.6" },
    headers: {
      "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  const forecastData = await axios.request(options)
    
  const forecast = forecastData.data.data[7].temp;

  console.log('weather bit current weather is ', currentWeather);

  console.log('weather bit 24hr forecast is ', forecast);

  return {
    currentWeather,
    forecast
  }

}




module.exports = weatherBit