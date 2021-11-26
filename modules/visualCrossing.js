const axios = require("axios");


///https://www.visualcrossing.com/weather/weather-data-services#/timeline



const visualCrossing = async () => {

  const currentWeatherData = await axios(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toronto?unitGroup=metric&key=${process.env.VISUALCROSSING_API_KEY}&include=current`
  );

  console.log(currentWeatherData.data.currentConditions.temp);

  const currentWeather = currentWeatherData.data.currentConditions.temp

  const forecastWeatherData = await axios(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toronto?unitGroup=metric&key=${process.env.VISUALCROSSING_API_KEY}&include=hours`
  );

  console.log(forecastWeatherData.data.days[1].hours[15].temp);

  const forecast = forecastWeatherData.data.days[1].hours[15].temp;

  

    return {
      currentWeather,
      forecast
    }
 

}


module.exports = visualCrossing