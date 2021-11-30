const axios = require("axios").default;


const bestWeather = async () => {
  const options = {
    method: "GET",
    url: "https://bestweather.p.rapidapi.com/weather/Toronto",
    params: { unitGroup: "us" },
    headers: {
      "x-rapidapi-host": "bestweather.p.rapidapi.com",
      "x-rapidapi-key": "7643a56475msh6063ffbfb31edfap133914jsn3cc2ccd46bca",
    },
  };

  const data = await axios.request(options);

  const forecast = (data.data.days[1].hours[15].temp - 32) * (5 / 9);
  const currentWeather = (data.data.currentConditions.temp - 32) * (5/9);

  console.log('bestWeather current temperature is', forecast.toFixed(2));
  console.log('bestWeather 24 hours prediction is', currentWeather.toFixed(2));

  return {
    currentWeather: currentWeather.toFixed(2),
    forecast: forecast.toFixed(2)
  }

};


module.exports = bestWeather
