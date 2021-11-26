const axios = require("axios").default;


const aeris = () => {
  let currentWeather;
  var currentOptions = {
    method: 'GET',
    url: 'https://aerisweather1.p.rapidapi.com/observations/toronto,ca',
    headers: {
      'x-rapidapi-host': 'aerisweather1.p.rapidapi.com',
      'x-rapidapi-key': ''
    }
  };
  
  axios.request(currentOptions).then(function (response) {
    
    currentWeather = response.data.response.ob.tempC
    console.log(currentWeather);
  }).catch(function (error) {
    console.error(error);
  });

  var options = {
    method: 'GET',
    url: 'https://aerisweather1.p.rapidapi.com/forecasts/toronto,ca',
    params: {plimit: '25', filter: '1hr'},
    headers: {
      'x-rapidapi-host': 'aerisweather1.p.rapidapi.com',
      'x-rapidapi-key': ''
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data.response[0].periods[23]);
  }).catch(function (error) {
    console.error(error);
  });

}


module.exports = aeris
