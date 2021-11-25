const axios = require("axios").default;

const openWeather = () => {
 
 const forecastOptions = {
  method: "GET",
  url: "https://community-open-weather-map.p.rapidapi.com/forecast",
  params: { q: "toronto, ca", units: "metric" },
  
  headers: {
    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    "x-rapidapi-key": process.env.OPEN_WEATHER_MAP_KEY,
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
    "x-rapidapi-key": process.env.OPEN_WEATHER_MAP_KEY,
  },
};

let forecast;
let currentWeather;
axios
  .request(forecastOptions)
  .then(function (response) {
    forecast = response.data.list[6].main.temp;
    console.log(forecast);
  })
  .then((response) => {
    axios
    .request(currentOptions)
    .then(function (response) {
      currentWeather = response.data.main.temp
      console.log(currentWeather);
    })
  })
  
  
  .catch(function (error) {
    console.error(error);
  });

}



  
   

module.exports = openWeather;
    
      
     
      
