const axios = require("axios").default;


const aeris = () => {
  let currentWeather;
  let forecast;
  const currentOptions = {
    method: 'GET',
    url: 'https://aerisweather1.p.rapidapi.com/observations/toronto,ca',
    headers: {
      'x-rapidapi-host': 'aerisweather1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };
  
  axios.request(currentOptions).then(function (response) {
    
    currentWeather = response.data.response.ob.tempC
    console.log(currentWeather);
  }).catch(function (error) {
    console.error(error);
  });

  const options = {
    method: "GET",
    url: "https://aerisweather1.p.rapidapi.com/forecasts/toronto,ca",
    params: { plimit: "25", filter: "1hr" },
    headers: {
      "x-rapidapi-host": "aerisweather1.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };
  
  axios.request(options).then(function (response) {
    forecast = response.data.response[0].periods[23].tempC;
    console.log(forecast);
  }).catch(function (error) {
    console.error(error);
  });

}


module.exports = aeris
