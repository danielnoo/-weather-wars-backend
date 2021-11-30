const axios = require("axios").default;

const openWeather = async () => {
 
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
      
  const currentWeather = currentWeatherData.data.main.temp
  console.log('OpenWeather API current weather is ', currentWeather);
  
  return {
    currentWeather: parseFloat(currentWeather.toFixed(1)),
    forecast: parseFloat(forecast.toFixed(1))
  }

}



  
   

module.exports = openWeather;
    
      
     
      
