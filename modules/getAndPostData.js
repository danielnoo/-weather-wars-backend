const Entry = require('../models/entry');
const getWeatherApiCall = require("./weatherApi"); 
const openWeatherCall = require("./openWeather");
const bestWeatherCall = require('./bestWeather');
const weatherBitCall = require('./weatherBit');
const visualCrossingCall = require('./visualCrossing');

// refactor entry model so that it must contain data from each of the api calls
// craft it in this module and send it to database

const getAndPostData = async () => {
  // make api calls
  const bestWeather = await bestWeatherCall();
  const openWeather = await openWeatherCall();
  const visualCrossing = await visualCrossingCall();
  const weatherApi = await getWeatherApiCall();
  const weatherBit = await weatherBitCall();

  // make the entry via model

  const entry = new Entry({
    bestWeather,
    openWeather,
    visualCrossing,
    weatherApi,
    weatherBit,
    date: new Date(),
  })

  // send to db

  entry.save().catch((error) => console.log(error));

}


module.exports = getAndPostData