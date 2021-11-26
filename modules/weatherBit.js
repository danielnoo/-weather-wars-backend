const axios = require("axios").default;


weatherBit = () => {
  let currentWeather;
  let forecast;
  const currentOptions = {
    method: 'GET',
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
    params: {lon: '-79.3', lat: '43.6'},
    headers: {
      'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  }

  axios.request(currentOptions).then(function (response) {
    currentWeather = response.data.data[0].temp;
    console.log(currentWeather);
  }).catch(function (error) {
    console.error(error);
  });

  const options = {
    method: "GET",
    url: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly",
    params: { lon: "-79.3", lat: "43.6" },
    headers: {
      "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
      "x-rapidapi-key": "7643a56475msh6063ffbfb31edfap133914jsn3cc2ccd46bca",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      forecast = response.data.data[7].temp;
      console.log(forecast);
    })
    .catch(function (error) {
      console.error(error);
    });

}




module.exports = weatherBit