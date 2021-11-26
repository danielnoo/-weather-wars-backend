const Entry = require('../models/entry');
const getWeatherApiCall = require("./weatherApi"); 
const openWeatherCall = require("./openWeather");
const aerisCall = require('./aeris');
const weatherBitCall = require('./weatherBit');
const visualCrossingCall = require('./visualCrossing');

// refactor entry model so that it must contain data from each of the api calls
// craft it in this module and send it to database

const getAndPostData = async () => {
  // make api calls
  const aeris = await aerisCall();
  const openWeather = await openWeatherCall();
  const visualCrossing = await visualCrossingCall();
  const weatherApi = await getWeatherApiCall();
  const weatherBit = await weatherBitCall();

  // make the entry via model

  const entry = new Entry({
    aeris,
    openWeather,
    visualCrossing,
    weatherApi,
    weatherBit,
    date: new Date(),
  })

  // send to db

  entry
    .save()
    .then((savedEntry) => savedEntry.toJSON())
    .then((formattedEntry) => res.json(formattedEntry))
    .catch((error) => console.log(error));

}


module.exports = getAndPostData