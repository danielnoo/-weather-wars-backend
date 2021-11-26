const axios = require("axios").default;


const aeris = async () => {
 
  const currentOptions = {
    method: 'GET',
    url: 'https://aerisweather1.p.rapidapi.com/observations/toronto,ca',
    headers: {
      'x-rapidapi-host': 'aerisweather1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };
  
  const currentWeatherData = await axios.request(currentOptions)

  const currentWeather = currentWeatherData.data.response.ob.tempC;
  console.log('Aeris API current weather is ', currentWeather)

  const options = {
    method: "GET",
    url: "https://aerisweather1.p.rapidapi.com/forecasts/toronto,ca",
    params: { plimit: "25", filter: "1hr" },
    headers: {
      "x-rapidapi-host": "aerisweather1.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };
  
  const forecastData = await axios.request(options)


  const forecast = forecastData.data.response[0].periods[23].tempC;
  console.log('Aeris API 24hr forecast is', forecast);


  return {
    currentWeather,
    forecast
  }

}


module.exports = aeris
