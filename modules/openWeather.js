const axios = require("axios").default;
const getDiff = require('./getDiff');

const openWeather = async (previousForecast) => {
 
  const forecastOptions = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/forecast",
    params: { q: "toronto, ca", units: "metric" },
    
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    }
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

  const forecastData = await axios.request(forecastOptions)

  const forecast = forecastData.data.list[6].main.temp;
  console.log('OpenWeather API 24hr forecast is ', forecast);
  
  const currentWeatherData = await axios.request(currentOptions)
      
  let currentWeather = currentWeatherData.data.main.temp
  currentWeather = parseFloat(currentWeather.toFixed(1))
  console.log('OpenWeather API current weather is ', currentWeather);
  


  // get difference between currentWeather and previousForecast

  const rating = 10 - getDiff(previousForecast, currentWeather);

  console.log(`openWeather current weather is ${currentWeather} -- forecast is ${forecast} -- weekly rating is ${rating}`);


  return {
    currentWeather,
    forecast,
    rating
  }

}



  
   

module.exports = openWeather;
    
      
     
      
