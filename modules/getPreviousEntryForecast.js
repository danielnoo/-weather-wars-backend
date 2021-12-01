const Entry = require("../models/entry");

// this module is run in getAndPostData.js and is meant to get the previous DB entry so that a score can be tallied in the object return of each individual api call

const getPreviousEntryForecast = async () => {
  
  // get array of objects from DB, sorted by most recent
  const entries = await Entry.find({}).sort({ _id: -1 });

  return {
    bestWeather: entries[0].bestWeather.forecast,
    openWeather: entries[0].openWeather.forecast,
    visualCrossing: entries[0].visualCrossing.forecast,
    weatherApi: entries[0].weatherApi.forecast,
    weatherBit: entries[0].weatherBit.forecast,
  };
};

module.exports = getPreviousEntryForecast;
